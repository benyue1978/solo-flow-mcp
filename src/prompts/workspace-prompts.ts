/**
 * Workspace setup function prompts for SoloFlow MCP
 * Project workspace configuration and setup functions
 */

// 1. Setup Workspace Prompt
export async function workspaceSetupWorkspacePrompt(args: {
  frontend?: string;
  backend?: string;
  testing?: string;
  deployment?: string;
  database?: string;
}): Promise<{
  messages: Array<{ role: "user"; content: { type: "text"; text: string } }>;
}> {
  const frontend = args.frontend || 'NA';
  const backend = args.backend || 'NA';
  const testing = args.testing || 'NA';
  const deployment = args.deployment || 'NA';
  const database = args.database || 'NA';
  
  let response = `⚙️ Workspace Setup Guide\n\n`;
  response += `🎨 Frontend: ${frontend}\n`;
  response += `⚙️ Backend: ${backend}\n`;
  response += `🧪 Testing: ${testing}\n`;
  response += `🚀 Deployment: ${deployment}\n`;
  response += `🗄️ Database: ${database}\n`;
  response += `📅 Date: ${new Date().toLocaleDateString()}\n\n`;
  
  response += `## Steps to Setup Workspace:\n\n`;
  
  response += `### 1. Read Project Overview\n`;
  response += `Understand project requirements:\n`;
  response += `\`\`\`json\n`;
  response += `{\n`;
  response += `  "tool": "read",\n`;
  response += `  "args": {\n`;
  response += `    "projectRoot": "/path/to/your/project",\n`;
  response += `    "type": "overview"\n`;
  response += `  }\n`;
  response += `}\n`;
  response += `\`\`\`\n\n`;
  
  response += `### 2. Read Requirements Document\n`;
  response += `Understand technical requirements:\n`;
  response += `\`\`\`json\n`;
  response += `{\n`;
  response += `  "tool": "read",\n`;
  response += `  "args": {\n`;
  response += `    "projectRoot": "/path/to/your/project",\n`;
  response += `    "type": "requirements"\n`;
  response += `  }\n`;
  response += `}\n`;
  response += `\`\`\`\n\n`;
  
  response += `### 3. Workspace Setup Process\n`;
  response += `- Initialize project structure\n`;
  response += `- Configure development environment\n`;
  response += `- Set up build tools and dependencies\n`;
  response += `- Configure testing framework\n`;
  response += `- Set up database and connections\n`;
  response += `- Configure deployment pipeline\n`;
  response += `- Set up monitoring and logging\n`;
  response += `- Create development guidelines\n\n`;
  
  response += `### 4. Project Structure Setup\n`;
  response += `\`\`\`bash\n`;
  response += `# Create project structure\n`;
  response += `mkdir -p src/{frontend,backend,shared}\n`;
  response += `mkdir -p tests/{unit,integration,e2e}\n`;
  response += `mkdir -p docs/{api,deployment,user}\n`;
  response += `mkdir -p config/{development,staging,production}\n`;
  response += `mkdir -p scripts/{build,deploy,test}\n`;
  response += `\`\`\`\n\n`;
  
  response += `### 5. Technology Stack Configuration\n`;
  
  if (frontend !== 'NA') {
    response += `#### Frontend Setup (${frontend})\n`;
    response += `\`\`\`bash\n`;
    if (frontend === 'React') {
      response += `# React setup\n`;
      response += `npx create-react-app frontend --template typescript\n`;
      response += `cd frontend && npm install @types/react @types/react-dom\n`;
    } else if (frontend === 'Vue') {
      response += `# Vue setup\n`;
      response += `npm create vue@latest frontend\n`;
      response += `cd frontend && npm install\n`;
    } else if (frontend === 'Angular') {
      response += `# Angular setup\n`;
      response += `ng new frontend --routing --style=scss\n`;
      response += `cd frontend && ng serve\n`;
    } else {
      response += `# Custom frontend setup for ${frontend}\n`;
      response += `# Configure ${frontend} according to project needs\n`;
    }
    response += `\`\`\`\n\n`;
  }
  
  if (backend !== 'NA') {
    response += `#### Backend Setup (${backend})\n`;
    response += `\`\`\`bash\n`;
    if (backend === 'Node.js') {
      response += `# Node.js setup\n`;
      response += `mkdir backend && cd backend\n`;
      response += `npm init -y\n`;
      response += `npm install express cors helmet morgan\n`;
      response += `npm install -D nodemon @types/node @types/express\n`;
    } else if (backend === 'Python') {
      response += `# Python setup\n`;
      response += `mkdir backend && cd backend\n`;
      response += `python -m venv venv\n`;
      response += `source venv/bin/activate  # On Windows: venv\\Scripts\\activate\n`;
      response += `pip install fastapi uvicorn sqlalchemy\n`;
    } else if (backend === 'Java') {
      response += `# Java setup\n`;
      response += `mkdir backend && cd backend\n`;
      response += `# Use Spring Boot Initializr or Maven/Gradle\n`;
    } else {
      response += `# Custom backend setup for ${backend}\n`;
      response += `# Configure ${backend} according to project needs\n`;
    }
    response += `\`\`\`\n\n`;
  }
  
  if (testing !== 'NA') {
    response += `#### Testing Setup (${testing})\n`;
    response += `\`\`\`bash\n`;
    if (testing === 'Jest') {
      response += `# Jest setup\n`;
      response += `npm install -D jest @types/jest\n`;
      response += `npm install -D @testing-library/react @testing-library/jest-dom\n`;
    } else if (testing === 'Cypress') {
      response += `# Cypress setup\n`;
      response += `npm install -D cypress\n`;
      response += `npx cypress open\n`;
    } else if (testing === 'Playwright') {
      response += `# Playwright setup\n`;
      response += `npm init playwright@latest\n`;
    } else {
      response += `# Custom testing setup for ${testing}\n`;
      response += `# Configure ${testing} according to project needs\n`;
    }
    response += `\`\`\`\n\n`;
  }
  
  if (database !== 'NA') {
    response += `#### Database Setup (${database})\n`;
    response += `\`\`\`bash\n`;
    if (database === 'PostgreSQL') {
      response += `# PostgreSQL setup\n`;
      response += `# Install PostgreSQL locally or use Docker\n`;
      response += `docker run --name postgres -e POSTGRES_PASSWORD=password -d postgres\n`;
    } else if (database === 'MongoDB') {
      response += `# MongoDB setup\n`;
      response += `docker run --name mongodb -d mongo:latest\n`;
    } else if (database === 'MySQL') {
      response += `# MySQL setup\n`;
      response += `docker run --name mysql -e MYSQL_ROOT_PASSWORD=password -d mysql:8\n`;
    } else {
      response += `# Custom database setup for ${database}\n`;
      response += `# Configure ${database} according to project needs\n`;
    }
    response += `\`\`\`\n\n`;
  }
  
  if (deployment !== 'NA') {
    response += `#### Deployment Setup (${deployment})\n`;
    response += `\`\`\`bash\n`;
    if (deployment === 'Docker') {
      response += `# Docker setup\n`;
      response += `# Create Dockerfile for each service\n`;
      response += `# Create docker-compose.yml for local development\n`;
    } else if (deployment === 'Kubernetes') {
      response += `# Kubernetes setup\n`;
      response += `# Create deployment.yaml, service.yaml, ingress.yaml\n`;
    } else if (deployment === 'AWS') {
      response += `# AWS setup\n`;
      response += `# Configure AWS CLI and create infrastructure\n`;
    } else {
      response += `# Custom deployment setup for ${deployment}\n`;
      response += `# Configure ${deployment} according to project needs\n`;
    }
    response += `\`\`\`\n\n`;
  }
  
  response += `### 6. Configuration Files\n`;
  response += `#### Package.json (Node.js)\n`;
  response += `\`\`\`json\n`;
  response += `{\n`;
  response += `  "name": "your-project",\n`;
  response += `  "version": "1.0.0",\n`;
  response += `  "scripts": {\n`;
  response += `    "dev": "concurrently \\"npm run dev:frontend\\" \\"npm run dev:backend\\"",\n`;
  response += `    "dev:frontend": "cd frontend && npm start",\n`;
  response += `    "dev:backend": "cd backend && npm run dev",\n`;
  response += `    "test": "npm run test:frontend && npm run test:backend",\n`;
  response += `    "test:frontend": "cd frontend && npm test",\n`;
  response += `    "test:backend": "cd backend && npm test",\n`;
  response += `    "build": "npm run build:frontend && npm run build:backend",\n`;
  response += `    "build:frontend": "cd frontend && npm run build",\n`;
  response += `    "build:backend": "cd backend && npm run build",\n`;
  response += `    "deploy": "docker-compose up -d"\n`;
  response += `  },\n`;
  response += `  "devDependencies": {\n`;
  response += `    "concurrently": "^7.0.0"\n`;
  response += `  }\n`;
  response += `}\n`;
  response += `\`\`\`\n\n`;
  
  if (deployment !== 'NA') {
    response += `#### Docker Compose\n`;
    response += `\`\`\`yaml\n`;
    response += `version: '3.8'\n`;
    response += `services:\n`;
    if (frontend !== 'NA') {
      response += `  frontend:\n`;
      response += `    build: ./frontend\n`;
      response += `    ports:\n`;
      response += `      - "3000:3000"\n`;
      response += `    depends_on:\n`;
      response += `      - backend\n`;
    }
    if (backend !== 'NA') {
      response += `  backend:\n`;
      response += `    build: ./backend\n`;
      response += `    ports:\n`;
      response += `      - "8000:8000"\n`;
      if (database !== 'NA') {
        response += `    depends_on:\n`;
        response += `      - database\n`;
      }
    }
    if (database !== 'NA') {
      response += `  database:\n`;
      response += `    image: ${database.toLowerCase()}:latest\n`;
      response += `    environment:\n`;
      response += `      POSTGRES_PASSWORD: password\n`;
      response += `    ports:\n`;
      response += `      - "5432:5432"\n`;
    }
    response += `\`\`\`\n\n`;
  }
  
  response += `### 7. Update System Architecture Document\n`;
  response += `\`\`\`json\n`;
  response += `{\n`;
  response += `  "tool": "update",\n`;
  response += `  "args": {\n`;
  response += `    "projectRoot": "/path/to/your/project",\n`;
  response += `    "type": "system_architecture",\n`;
  response += `    "content": "# System Architecture\\n\\n## Technology Stack\\n- **Frontend**: ${frontend}\\n- **Backend**: ${backend}\\n- **Testing**: ${testing}\\n- **Deployment**: ${deployment}\\n- **Database**: ${database}\\n\\n## Project Structure\\n\\\`\\nproject/\\n├── frontend/          # ${frontend} application\\n├── backend/           # ${backend} application\\n├── shared/            # Shared utilities\\n├── tests/             # Test files\\n│   ├── unit/\\n│   ├── integration/\\n│   └── e2e/\\n├── docs/              # Documentation\\n├── config/            # Configuration files\\n└── scripts/           # Build and deployment scripts\\n\\\`\\n\\n## Development Environment\\n- Local development with hot reload\\n- Integrated testing setup\\n- Database with Docker\\n- CI/CD pipeline configuration\\n\\n## Deployment Architecture\\n- Containerized services\\n- Load balancer configuration\\n- Database clustering\\n- Monitoring and logging\\n\\n## Update History\\n- ${new Date().toISOString().split('T')[0]}: Workspace setup completed"\n`;
  response += `  }\n`;
  response += `}\n`;
  response += `\`\`\`\n\n`;
  
  response += `💡 **Workspace Setup Tips**:\n`;
  response += `- Use consistent coding standards\n`;
  response += `- Set up proper environment variables\n`;
  response += `- Configure linting and formatting\n`;
  response += `- Set up pre-commit hooks\n`;
  response += `- Document setup procedures\n`;
  response += `- Test the complete setup\n`;
  
  return {
    messages: [{
      role: "user",
      content: { type: "text", text: response }
    }]
  };
}
