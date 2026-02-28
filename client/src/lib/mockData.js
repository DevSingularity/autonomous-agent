export const CHECKLIST_TEMPLATES = {
    Backend: {
        Intern: [
            { id: '1', task: 'Create GitHub account and get repo access', category: 'Setup', priority: 'high' },
            { id: '2', task: 'Set up local Python environment (pyenv + venv)', category: 'Setup', priority: 'high' },
            { id: '3', task: 'Clone the main backend repository', category: 'Setup', priority: 'high' },
            { id: '4', task: 'Run migrations and start the dev server', category: 'Setup', priority: 'high' },
            { id: '5', task: 'Read API Architecture Documentation', category: 'Learning', priority: 'medium' },
            { id: '6', task: 'Review code style guide and linting rules', category: 'Learning', priority: 'medium' },
            { id: '7', task: 'Set up pre-commit hooks', category: 'Setup', priority: 'medium' },
            { id: '8', task: 'Complete your first PR (small bug fix)', category: 'Milestone', priority: 'high' },
            { id: '9', task: 'Join #backend-eng Slack channel', category: 'Team', priority: 'low' },
            { id: '10', task: 'Schedule 1:1 with your team lead', category: 'Team', priority: 'medium' },
        ],
        Junior: [
            { id: '1', task: 'Get GitHub access and explore repositories', category: 'Setup', priority: 'high' },
            { id: '2', task: 'Configure full local dev environment', category: 'Setup', priority: 'high' },
            { id: '3', task: 'Review system architecture diagrams', category: 'Learning', priority: 'high' },
            { id: '4', task: 'Set up monitoring and observability tools', category: 'Setup', priority: 'medium' },
            { id: '5', task: 'Complete a meaningful feature ticket', category: 'Milestone', priority: 'high' },
            { id: '6', task: 'Pair program with a senior engineer', category: 'Team', priority: 'medium' },
            { id: '7', task: 'Review deployment pipeline and CI/CD docs', category: 'Learning', priority: 'medium' },
        ],
        Senior: [
            { id: '1', task: 'Get full repository and infrastructure access', category: 'Setup', priority: 'high' },
            { id: '2', task: 'Deep dive: system architecture and tech debt', category: 'Learning', priority: 'high' },
            { id: '3', task: 'Meet all team leads (cross-functional)', category: 'Team', priority: 'high' },
            { id: '4', task: 'Review current roadmap and OKRs', category: 'Learning', priority: 'high' },
            { id: '5', task: 'Identify first high-impact contribution area', category: 'Milestone', priority: 'high' },
            { id: '6', task: 'Lead your first technical design review', category: 'Milestone', priority: 'medium' },
        ],
    },
    Frontend: {
        Intern: [
            { id: '1', task: 'Get GitHub access and clone frontend repo', category: 'Setup', priority: 'high' },
            { id: '2', task: 'Set up Node.js environment', category: 'Setup', priority: 'high' },
            { id: '3', task: 'Run dev server and explore the app', category: 'Setup', priority: 'high' },
            { id: '4', task: 'Read component library docs (Storybook)', category: 'Learning', priority: 'medium' },
            { id: '5', task: 'Review Figma design system', category: 'Learning', priority: 'medium' },
            { id: '6', task: 'Fix a small UI bug as first PR', category: 'Milestone', priority: 'high' },
            { id: '7', task: 'Join #frontend-eng Slack channel', category: 'Team', priority: 'low' },
        ],
        Junior: [
            { id: '1', task: 'Set up frontend development environment', category: 'Setup', priority: 'high' },
            { id: '2', task: 'Review component architecture patterns', category: 'Learning', priority: 'high' },
            { id: '3', task: 'Complete a medium-complexity UI ticket', category: 'Milestone', priority: 'high' },
            { id: '4', task: 'Study accessibility (a11y) standards', category: 'Learning', priority: 'medium' },
            { id: '5', task: 'Set up performance profiling tools', category: 'Setup', priority: 'medium' },
        ],
        Senior: [
            { id: '1', task: 'Audit frontend architecture and bundle size', category: 'Learning', priority: 'high' },
            { id: '2', task: 'Review design system and component ownership', category: 'Learning', priority: 'high' },
            { id: '3', task: 'Meet with design and product leads', category: 'Team', priority: 'high' },
            { id: '4', task: 'Identify performance improvement opportunities', category: 'Milestone', priority: 'medium' },
        ],
    },
    DevOps: {
        Intern: [
            { id: '1', task: 'Get cloud console read access', category: 'Setup', priority: 'high' },
            { id: '2', task: 'Install and configure CLI tools (kubectl, terraform)', category: 'Setup', priority: 'high' },
            { id: '3', task: 'Read infrastructure overview documentation', category: 'Learning', priority: 'high' },
            { id: '4', task: 'Shadow a production deployment', category: 'Milestone', priority: 'medium' },
            { id: '5', task: 'Join #infra and #on-call Slack channels', category: 'Team', priority: 'low' },
        ],
        Senior: [
            { id: '1', task: 'Get full cloud and infrastructure access', category: 'Setup', priority: 'high' },
            { id: '2', task: 'Review IaC (Terraform/Pulumi) codebase', category: 'Learning', priority: 'high' },
            { id: '3', task: 'Audit existing CI/CD pipelines', category: 'Learning', priority: 'high' },
            { id: '4', task: 'Review incident response runbooks', category: 'Learning', priority: 'high' },
            { id: '5', task: 'Meet SRE and platform engineering teams', category: 'Team', priority: 'high' },
        ],
    },
    'Full-Stack': {
        Intern: [
            { id: '1', task: 'Get GitHub access to all relevant repos', category: 'Setup', priority: 'high' },
            { id: '2', task: 'Set up both frontend and backend environments', category: 'Setup', priority: 'high' },
            { id: '3', task: 'Understand the full request lifecycle', category: 'Learning', priority: 'high' },
            { id: '4', task: 'Complete a small end-to-end feature', category: 'Milestone', priority: 'high' },
            { id: '5', task: 'Schedule 1:1 with your buddy', category: 'Team', priority: 'medium' },
        ],
    },
}

export const MOCK_KNOWLEDGE_RESPONSES = {
    setup: `Based on our **Dev Setup Guide**, here's how to get started:

**1. Prerequisites**
Ensure you have \`git\`, \`docker\`, and the relevant runtime installed (Node.js/Python/Go).

**2. Clone the repository**
\`\`\`bash
git clone git@github.com:yourorg/main-repo.git
cd main-repo
\`\`\`

**3. Install dependencies**
\`\`\`bash
make install  # or npm install / pip install -r requirements.txt
\`\`\`

**4. Configure environment**
\`\`\`bash
cp .env.example .env.local
# Fill in required values — ask your team lead for secrets
\`\`\`

**5. Start dev server**
\`\`\`bash
make dev  # or docker-compose up
\`\`\`

> 📖 Full guide: [Engineering Handbook → Local Setup](/docs/setup)`,

    git: `Our **Git Workflow** follows trunk-based development:

- **Main branch** is always deployable — never commit directly
- **Branch naming**: \`feat/your-feature\`, \`fix/bug-name\`, \`chore/task\`
- **Commits**: Follow Conventional Commits — \`feat:\`, \`fix:\`, \`docs:\`, \`chore:\`
- **PRs**: Require passing CI + 1 approver + no unresolved comments
- **Merging**: Squash and merge to keep history clean

> ⚠️ Always pull from main before starting new work.
> 📖 Source: [Git Workflow Guide](/docs/git)`,

    deploy: `Our **Deployment Process**:

1. Merging to \`main\` auto-deploys to **staging** via GitHub Actions
2. Production deploys need manual approval from a senior engineer
3. Deployments happen via: \`gh workflow run deploy.yml\`
4. **Rollback**: \`kubectl rollout undo deployment/service-name\`

> ⚠️ **No Friday deploys** without on-call coverage!
> 📖 Source: [Deployment Runbook](/docs/deploy)`,

    security: `Our **Security Policy** highlights:

- All secrets go in **Vault** — never in code or \`.env\` files committed to git
- Use service accounts, not personal credentials for automation
- Enable 2FA on all engineering accounts (GitHub, cloud, Slack)
- Report vulnerabilities to **security@company.com**
- External APIs must be approved by the security team

> 📖 Source: [Security Policy](/docs/security)`,

    default: `I searched our knowledge base for your question. Here's what I found:

Our engineering documentation covers:
- **Setup & environments** — local dev, staging, production
- **Git workflow** — branching, PRs, code review standards  
- **Deployment** — CI/CD pipelines and release process
- **Security** — access control, secrets management
- **Team norms** — communication, meetings, async-first culture

Try asking about one of these specific topics for a grounded answer.

> 💡 Can't find what you need? Post in **#dev-help** on Slack or ask your buddy.`,
}

export const MOCK_EMPLOYEES_DASHBOARD = [
    {
        id: '1', name: 'Aisha Patel', role: 'Backend', experience: 'Junior',
        team: 'Platform', status: 'In Progress', progress: 72,
        startDate: '2026-02-20', avatar: 'AP',
    },
    {
        id: '2', name: 'Marcus Chen', role: 'Frontend', experience: 'Senior',
        team: 'Product', status: 'Completed', progress: 100,
        startDate: '2026-02-15', avatar: 'MC',
    },
    {
        id: '3', name: 'Sofia Rodriguez', role: 'DevOps', experience: 'Mid-Level',
        team: 'Infrastructure', status: 'In Progress', progress: 45,
        startDate: '2026-02-24', avatar: 'SR',
    },
    {
        id: '4', name: 'James Okafor', role: 'Full-Stack', experience: 'Intern',
        team: 'Growth', status: 'In Progress', progress: 20,
        startDate: '2026-02-26', avatar: 'JO',
    },
]
