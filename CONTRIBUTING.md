# Contributing to QR Custom Generator

Thank you for your interest in contributing to QR Custom Generator! This document provides guidelines and instructions for contributing.

## Getting Started

1. Fork the repository
2. Clone your fork locally
3. Install dependencies: `npm install`
4. Create a new branch: `git checkout -b feature/your-feature-name`

## Development Setup

### Prerequisites
- Node.js 18 or higher
- npm or yarn
- Supabase account (for database features)

### Local Development

1. Copy `.env.example` to `.env` and configure your Supabase credentials
2. Run the development server: `npm run dev`
3. Open http://localhost:5173 in your browser

## Project Structure

```
src/
├── components/     # React components
├── constants/      # Constants and configuration
├── hooks/         # Custom React hooks
├── lib/           # Third-party library setup
├── types/         # TypeScript type definitions
└── utils/         # Utility functions
```

## Code Style

### TypeScript
- Use TypeScript for all new code
- Define proper types and interfaces
- Avoid `any` type unless absolutely necessary

### React
- Use functional components with hooks
- Follow React hooks best practices
- Keep components focused and single-purpose

### Styling
- Use Tailwind CSS utility classes
- Follow the existing color scheme and design patterns
- Ensure responsive design (mobile, tablet, desktop)
- Test in both light and dark modes

### Naming Conventions
- Components: PascalCase (e.g., `ColorPicker.tsx`)
- Functions: camelCase (e.g., `generateQRCode`)
- Constants: UPPER_SNAKE_CASE (e.g., `QR_TEMPLATES`)
- Types/Interfaces: PascalCase (e.g., `QRCodeConfig`)

## What to Contribute

### Bug Fixes
- Check existing issues before creating a new one
- Include steps to reproduce the bug
- Provide expected vs actual behavior
- Include screenshots if applicable

### New Features
- Discuss major features in an issue first
- Keep features focused and well-defined
- Update documentation and tests
- Ensure backward compatibility

### Documentation
- Fix typos and improve clarity
- Add examples and use cases
- Update API documentation when needed
- Include code comments for complex logic

## Pull Request Process

1. **Update Documentation**: If your PR adds features or changes behavior, update the README.md and API.md

2. **Test Your Changes**:
   ```bash
   npm run build
   npm run lint
   ```

3. **Commit Messages**: Use clear, descriptive commit messages
   - Good: "Add WiFi QR code validation"
   - Bad: "Update files"

4. **PR Description**: Include:
   - What changes you made
   - Why you made them
   - Screenshots (for UI changes)
   - Related issue numbers

5. **Code Review**: Be responsive to feedback and make requested changes

## Testing Guidelines

Before submitting a PR:

1. **Manual Testing**:
   - Test all affected features
   - Try edge cases and error scenarios
   - Test on different browsers
   - Test on mobile devices
   - Test both light and dark modes

2. **Build Testing**:
   ```bash
   npm run build
   npm run preview
   ```

3. **Type Checking**:
   ```bash
   npm run typecheck
   ```

## Feature Requests

We welcome feature requests! When suggesting a feature:

1. Check if it already exists or is planned
2. Describe the use case clearly
3. Explain the expected behavior
4. Consider implementation complexity
5. Be open to discussion and alternatives

## Bug Reports

When reporting bugs:

1. **Search Existing Issues**: Check if the bug has been reported
2. **Reproducible Steps**: Provide clear steps to reproduce
3. **Expected Behavior**: Describe what should happen
4. **Actual Behavior**: Describe what actually happens
5. **Environment**:
   - Browser and version
   - Operating system
   - Screen size (for responsive issues)
6. **Screenshots/Videos**: Include visual evidence if applicable

## Code of Conduct

### Our Standards

- Be respectful and inclusive
- Welcome newcomers and help them learn
- Accept constructive criticism gracefully
- Focus on what's best for the project
- Show empathy towards others

### Unacceptable Behavior

- Harassment or discriminatory language
- Trolling or insulting comments
- Personal or political attacks
- Publishing others' private information

## Questions?

If you have questions:
- Check the README.md and API.md first
- Search existing issues and discussions
- Create a new issue with the "question" label
- Be specific and provide context

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

## Recognition

Contributors will be recognized in the project. Thank you for helping make QR Custom Generator better!
