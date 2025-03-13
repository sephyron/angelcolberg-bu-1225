# CLAUDE.md - Guidance for AI Assistants

## Project Overview
This is Angel Colberg's portfolio website, a static HTML/CSS/JavaScript site showcasing various projects and work. The site uses modern vanilla JavaScript and CSS without frameworks or build systems.

## Build Commands
- The site doesn't utilize a build system
- View the site locally by opening index.html in a browser
- For development, use browser dev tools or VS Code Live Server

## Code Style Guidelines
- **HTML**: Semantic structure with BEM-like class naming
- **CSS**: 
  - Variables stored as custom properties in :root
  - Mobile-first responsive design
  - Classes follow component/element pattern
- **JavaScript**: 
  - ES6+ syntax with async/await for async operations
  - Event listeners attached after DOM content loaded
  - Intersection Observer for scroll animations
  - Use const/let appropriately; avoid var

## File Organization
- CSS in /css directory with /static subdirectory for vendor styles
- JavaScript in /js directory
- Images in /images organized by project
- Keep new files consistent with existing organization

## Best Practices
- Avoid jQuery or other dependencies
- Use vanilla JS and CSS features (Grid, Flexbox, Custom Properties)
- Ensure responsive design across all screen sizes
- Add appropriate comments for complex code but keep it minimal