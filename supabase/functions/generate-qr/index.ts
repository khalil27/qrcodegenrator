import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import QRCode from "npm:qrcode@1.5.3";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface QRRequest {
  content: string;
  qrColor?: string;
  bgColor?: string;
  size?: number;
  errorCorrection?: "L" | "M" | "Q" | "H";
  format?: "png" | "svg";
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    if (req.method !== "POST") {
      return new Response(
        JSON.stringify({ error: "Method not allowed" }),
        {
          status: 405,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const body: QRRequest = await req.json();
    const {
      content,
      qrColor = "#000000",
      bgColor = "#FFFFFF",
      size = 300,
      errorCorrection = "M",
      format = "png",
    } = body;

    if (!content) {
      return new Response(
        JSON.stringify({ error: "Content is required" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    let qrData: string;

    if (format === "svg") {
      qrData = await QRCode.toString(content, {
        type: "svg",
        width: size,
        margin: 2,
        color: {
          dark: qrColor,
          light: bgColor,
        },
        errorCorrectionLevel: errorCorrection,
      });
    } else {
      qrData = await QRCode.toDataURL(content, {
        width: size,
        margin: 2,
        color: {
          dark: qrColor,
          light: bgColor,
        },
        errorCorrectionLevel: errorCorrection,
      });
    }

    return new Response(
      JSON.stringify({
        success: true,
        data: qrData,
        format,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error generating QR code:", error);
    return new Response(
      JSON.stringify({ error: "Failed to generate QR code" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
