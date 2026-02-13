# READEE

A nonprofit literacy program website helping young readers build strong reading skills.

## What is READEE?

READEE is a comprehensive early literacy program designed to support K-2 students in developing essential reading comprehension skills. The program works alongside schools and teachers to strengthen early reading through engaging, effective lessons focused on:

- **Phonics & Vocabulary**: Students learn key vocabulary and practice decoding
- **Text Comprehension**: Short "micro-checks" help students track what's happening
- **Critical Thinking**: Students answer why/how questions and explain their thinking

READEE complements—never replaces—classroom instruction, providing short, fun lessons with guided practice.

## Who is READEE For?

### Primary Audience

- **Parents** of K-2 students looking to supplement classroom learning
- **Teachers** seeking additional resources to support early readers
- **Schools** interested in evidence-based literacy programs

### Educational Focus

- Kindergarten through 2nd grade students
- Aligned with Pennsylvania ELA (English Language Arts) standards
- Supports students who need additional reading practice

## Current Status

**Prototype/MVP** - This is an early-stage website showcasing the READEE literacy program concept.

### What's Working

- ✅ Informational landing page explaining the program
- ✅ Multi-page site structure with responsive design
- ✅ "Get Started" questionnaire for interest collection
- ✅ ELA standards reference page
- ✅ Mobile-friendly navigation

### What's In Development

- 🚧 Backend integration for form submissions
- 🚧 Actual lesson content and interactive exercises
- 🚧 Student progress tracking
- 🚧 Teacher/parent dashboard

## Next Planned Steps

1. **Backend Development**
   - Set up form submission handling
   - Create user registration and authentication system
   - Build database for storing student progress

2. **Content Development**
   - Create interactive reading lessons
   - Develop vocabulary exercises
   - Build comprehension assessment tools

3. **Feature Expansion**
   - Parent/teacher dashboard
   - Progress reporting
   - Lesson recommendation engine based on student performance

4. **Quality Assurance**
   - User testing with teachers and parents
   - Accessibility improvements (WCAG compliance)
   - Performance optimization

## Project Structure

```
fillysteeze/
├── index.html              # Main landing page
├── questionnaire.html      # Get started form
├── standards.html          # ELA standards reference
├── nonprofit-literacy.html # Program information
├── engaging-effective.html # Teaching methodology
├── supporting-classroom.html # Classroom support info
├── thankyou.html          # Form submission confirmation
├── app.js                 # JavaScript for interactivity
├── style.css              # Styles for all pages
├── assets/                # Images and visual assets
├── data/                  # CSV data files
└── README.md              # This file
```

## Technology Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Design**: Custom CSS with responsive design
- **Standards**: Pennsylvania ELA learning standards (K-2)

## Getting Started (Development)

1. Clone the repository
2. Install dependencies: `npm install`
3. Open `index.html` in a web browser
4. No build process required - it's a static website

### Code Quality Tools

This project uses Prettier and ESLint to maintain code quality and consistency.

#### Available Scripts

- **`npm run format`** - Auto-format all HTML, CSS, JS, JSON, and Markdown files
- **`npm run format:check`** - Check if files are formatted correctly (useful for CI/CD)
- **`npm run lint`** - Lint JavaScript files for code quality issues

#### Configuration Files

- **`package.json`**: Contains project dependencies and npm scripts
- **`.prettierrc`**: Prettier configuration for code formatting (2-space indentation, semicolons, double quotes)
- **`.prettierignore`**: Files and directories to exclude from formatting
- **`eslint.config.js`**: ESLint configuration for JavaScript linting (browser environment, ES2022)

### Lighthouse CI Audits

This project uses Lighthouse CI to audit the live GitHub Pages site for performance, accessibility, SEO, and best practices.

#### Automated Audits

Lighthouse CI runs automatically:

- On every pull request to the `main` branch
- Via manual trigger from the GitHub Actions tab

The audits test the live production site at `https://filipgalietti-cpu.github.io/readee-site/` and will warn (but not fail) if scores drop below the following thresholds:

- **Performance**: 80%
- **Accessibility**: 90%
- **Best Practices**: 80%
- **SEO**: 90%

#### Running Lighthouse Audits Manually

To run a Lighthouse audit manually on your local machine:

1. **Install Lighthouse CI globally:**

   ```bash
   npm install -g @lhci/cli
   ```

2. **Run the audit:**

   ```bash
   lhci autorun
   ```

   This will:
   - Audit the live GitHub Pages site (configured in `lighthouserc.json`)
   - Run 3 audits and take the median score
   - Display results in your terminal
   - Upload results to temporary public storage for review

3. **View detailed results:**
   - Check the terminal output for scores and warnings
   - Follow the temporary storage link to view the full Lighthouse report
   - Review the `.lighthouseci/` directory for detailed JSON results

#### Alternative: Manual Trigger via GitHub Actions

You can also trigger a Lighthouse audit without running it locally:

1. Go to the [Actions tab](https://github.com/filipgalietti-cpu/readee-site/actions/workflows/lighthouse.yml) in GitHub
2. Click "Run workflow"
3. Select the branch and click "Run workflow"
4. Wait for the workflow to complete
5. Download the "lighthouse-results" artifact to view the detailed reports

#### Configuration Files

- **`lighthouserc.json`**: Lighthouse CI configuration (target URL, thresholds, number of runs)
- **`.github/workflows/lighthouse.yml`**: GitHub Actions workflow for automated audits

## Contributing

This is an early-stage project. If you're interested in contributing or learning more about READEE, please reach out through the questionnaire on the website.

## License

_To be determined_

## Contact

For questions or partnership inquiries, please use the "Get Started" form on the website.
