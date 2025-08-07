/**
 * Design function prompts for SoloFlow MCP
 * Comprehensive design functions including UI, system, architecture, data, and API design
 */

// 1. Design UI Interface Prompt
export async function designCreateUIPrompt(args: {
  component?: string;
  page?: string;
  designType?: string;
}): Promise<{
  messages: Array<{ role: "user"; content: { type: "text"; text: string } }>;
}> {
  const component = args.component || 'Main Interface';
  const page = args.page || 'Home Page';
  const designType = args.designType || 'User Interface';
  
  let response = `🎨 UI Design Guide\n\n`;
  response += `🎯 Component: ${component}\n`;
  response += `📄 Page: ${page}\n`;
  response += `🎨 Design Type: ${designType}\n`;
  response += `📅 Date: ${new Date().toLocaleDateString()}\n\n`;
  
  response += `## Steps to Design UI Interface:\n\n`;
  
  response += `### 1. Read Requirements Document\n`;
  response += `Understand user requirements:\n`;
  response += `\`\`\`json\n`;
  response += `{\n`;
  response += `  "tool": "read",\n`;
  response += `  "args": {\n`;
  response += `    "projectRoot": "/path/to/your/project",\n`;
  response += `    "type": "requirements"\n`;
  response += `  }\n`;
  response += `}\n`;
  response += `\`\`\`\n\n`;
  
  response += `### 2. Read Current UI Design\n`;
  response += `Review existing UI design:\n`;
  response += `\`\`\`json\n`;
  response += `{\n`;
  response += `  "tool": "read",\n`;
  response += `  "args": {\n`;
  response += `    "projectRoot": "/path/to/your/project",\n`;
  response += `    "type": "ui_design"\n`;
  response += `  }\n`;
  response += `}\n`;
  response += `\`\`\`\n\n`;
  
  response += `### 3. UI Design Process\n`;
  response += `- Analyze user requirements\n`;
  response += `- Define user personas\n`;
  response += `- Create wireframes\n`;
  response += `- Design visual mockups\n`;
  response += `- Define interaction patterns\n`;
  response += `- Plan responsive design\n`;
  response += `- Consider accessibility\n`;
  response += `- Document design decisions\n\n`;
  
  response += `### 4. Design Components\n`;
  response += `#### Layout Design\n`;
  response += `- Header and navigation\n`;
  response += `- Main content area\n`;
  response += `- Sidebar and menus\n`;
  response += `- Footer and links\n\n`;
  
  response += `#### Component Design\n`;
  response += `- Form components\n`;
  response += `- Button styles\n`;
  response += `- Input fields\n`;
  response += `- Modal dialogs\n`;
  response += `- Data tables\n`;
  response += `- Charts and graphs\n\n`;
  
  response += `#### Interaction Design\n`;
  response += `- Click and hover states\n`;
  response += `- Loading states\n`;
  response += `- Error handling\n`;
  response += `- Success feedback\n`;
  response += `- Navigation flow\n\n`;
  
  response += `### 5. Update UI Design Document\n`;
  response += `\`\`\`json\n`;
  response += `{\n`;
  response += `  "tool": "update",\n`;
  response += `  "args": {\n`;
  response += `    "projectRoot": "/path/to/your/project",\n`;
  response += `    "type": "ui_design",\n`;
  response += `    "content": "# UI Design\\n\\n## Design Principles\\n- **Simplicity**: Clean and intuitive interface\\n- **Consistency**: Uniform design patterns\\n- **Usability**: Easy to use and navigate\\n- **Accessibility**: Inclusive design for all users\\n\\n## Page Design\\n### ${page}\\n- **Layout**: [Layout description]\\n- **Components**: [Component list]\\n- **Interactions**: [Interaction patterns]\\n\\n## Component Design\\n### ${component}\\n- **Purpose**: [Component purpose]\\n- **Props**: [Component properties]\\n- **States**: [Component states]\\n- **Styling**: [Style guidelines]\\n\\n## Design System\\n- **Colors**: [Color palette]\\n- **Typography**: [Font choices]\\n- **Spacing**: [Spacing system]\\n- **Icons**: [Icon set]\\n\\n## Responsive Design\\n- **Mobile**: [Mobile design considerations]\\n- **Tablet**: [Tablet design considerations]\\n- **Desktop**: [Desktop design considerations]\\n\\n## Accessibility\\n- **WCAG Compliance**: [Compliance level]\\n- **Keyboard Navigation**: [Keyboard support]\\n- **Screen Reader**: [Screen reader support]\\n\\n## Update History\\n- ${new Date().toISOString().split('T')[0]}: Created UI design for ${component}"\n`;
  response += `  }\n`;
  response += `}\n`;
  response += `\`\`\`\n\n`;
  
  response += `💡 **UI Design Tips**:\n`;
  response += `- Focus on user experience\n`;
  response += `- Keep designs simple and clean\n`;
  response += `- Ensure consistency across components\n`;
  response += `- Consider mobile-first design\n`;
  response += `- Test with real users\n`;
  response += `- Document design decisions\n`;
  
  return {
    messages: [{
      role: "user",
      content: { type: "text", text: response }
    }]
  };
}

// 2. Design System Architecture Prompt
export async function designSystemArchitecturePrompt(args: {
  systemType?: string;
  scale?: string;
}): Promise<{
  messages: Array<{ role: "user"; content: { type: "text"; text: string } }>;
}> {
  const systemType = args.systemType || 'Web Application';
  const scale = args.scale || 'Medium Scale';
  
  let response = `🏗️ System Architecture Design Guide\n\n`;
  response += `🎯 System Type: ${systemType}\n`;
  response += `📊 Scale: ${scale}\n`;
  response += `📅 Date: ${new Date().toLocaleDateString()}\n\n`;
  
  response += `## Steps to Design System Architecture:\n\n`;
  
  response += `### 1. Read Requirements Document\n`;
  response += `Understand system requirements:\n`;
  response += `\`\`\`json\n`;
  response += `{\n`;
  response += `  "tool": "read",\n`;
  response += `  "args": {\n`;
  response += `    "projectRoot": "/path/to/your/project",\n`;
  response += `    "type": "requirements"\n`;
  response += `  }\n`;
  response += `}\n`;
  response += `\`\`\`\n\n`;
  
  response += `### 2. Read Current Architecture\n`;
  response += `Review existing architecture:\n`;
  response += `\`\`\`json\n`;
  response += `{\n`;
  response += `  "tool": "read",\n`;
  response += `  "args": {\n`;
  response += `    "projectRoot": "/path/to/your/project",\n`;
  response += `    "type": "system_architecture"\n`;
  response += `  }\n`;
  response += `}\n`;
  response += `\`\`\`\n\n`;
  
  response += `### 3. Architecture Design Process\n`;
  response += `- Analyze functional requirements\n`;
  response += `- Define non-functional requirements\n`;
  response += `- Choose architectural patterns\n`;
  response += `- Design system components\n`;
  response += `- Plan data flow\n`;
  response += `- Consider scalability\n`;
  response += `- Address security concerns\n`;
  response += `- Plan for deployment\n\n`;
  
  response += `### 4. Architecture Components\n`;
  response += `#### System Layers\n`;
  response += `- Presentation Layer (UI/API)\n`;
  response += `- Business Logic Layer\n`;
  response += `- Data Access Layer\n`;
  response += `- Infrastructure Layer\n\n`;
  
  response += `#### Design Patterns\n`;
  response += `- MVC (Model-View-Controller)\n`;
  response += `- Microservices\n`;
  response += `- Event-Driven Architecture\n`;
  response += `- Layered Architecture\n`;
  response += `- CQRS (Command Query Responsibility Segregation)\n\n`;
  
  response += `#### Technology Stack\n`;
  response += `- Frontend Technologies\n`;
  response += `- Backend Technologies\n`;
  response += `- Database Technologies\n`;
  response += `- Infrastructure Services\n`;
  response += `- Monitoring & Logging\n\n`;
  
  response += `### 5. Update System Architecture Document\n`;
  response += `\`\`\`json\n`;
  response += `{\n`;
  response += `  "tool": "update",\n`;
  response += `  "args": {\n`;
  response += `    "projectRoot": "/path/to/your/project",\n`;
  response += `    "type": "system_architecture",\n`;
  response += `    "content": "# System Architecture\\n\\n## Architecture Overview\\n- **System Type**: ${systemType}\\n- **Scale**: ${scale}\\n- **Pattern**: [Architectural pattern]\\n\\n## System Components\\n### Frontend\\n- **Framework**: [Frontend framework]\\n- **State Management**: [State management solution]\\n- **UI Library**: [UI component library]\\n\\n### Backend\\n- **Framework**: [Backend framework]\\n- **API Design**: [API architecture]\\n- **Authentication**: [Auth solution]\\n\\n### Database\\n- **Primary Database**: [Database technology]\\n- **Caching**: [Caching strategy]\\n- **Data Migration**: [Migration strategy]\\n\\n### Infrastructure\\n- **Hosting**: [Hosting platform]\\n- **CDN**: [Content delivery]\\n- **Monitoring**: [Monitoring tools]\\n\\n## Data Flow\\n[Data flow description]\\n\\n## Security Design\\n- **Authentication**: [Auth methods]\\n- **Authorization**: [Access control]\\n- **Data Protection**: [Data security]\\n\\n## Scalability Plan\\n- **Horizontal Scaling**: [Scaling strategy]\\n- **Performance**: [Performance considerations]\\n- **Load Balancing**: [Load balancing approach]\\n\\n## Update History\\n- ${new Date().toISOString().split('T')[0]}: Created system architecture for ${systemType}"\n`;
  response += `  }\n`;
  response += `}\n`;
  response += `\`\`\`\n\n`;
  
  response += `💡 **Architecture Design Tips**:\n`;
  response += `- Start with requirements analysis\n`;
  response += `- Consider future scalability\n`;
  response += `- Document design decisions\n`;
  response += `- Plan for security from the start\n`;
  response += `- Consider deployment strategy\n`;
  response += `- Plan for monitoring and maintenance\n`;
  
  return {
    messages: [{
      role: "user",
      content: { type: "text", text: response }
    }]
  };
}

// 3. Design API Interface Prompt
export async function designAPIInterfacePrompt(args: {
  apiType?: string;
  version?: string;
}): Promise<{
  messages: Array<{ role: "user"; content: { type: "text"; text: string } }>;
}> {
  const apiType = args.apiType || 'REST API';
  const version = args.version || 'v1';
  
  let response = `🔌 API Design Guide\n\n`;
  response += `🎯 API Type: ${apiType}\n`;
  response += `📋 Version: ${version}\n`;
  response += `📅 Date: ${new Date().toLocaleDateString()}\n\n`;
  
  response += `## Steps to Design API Interface:\n\n`;
  
  response += `### 1. Read Requirements Document\n`;
  response += `Understand API requirements:\n`;
  response += `\`\`\`json\n`;
  response += `{\n`;
  response += `  "tool": "read",\n`;
  response += `  "args": {\n`;
  response += `    "projectRoot": "/path/to/your/project",\n`;
  response += `    "type": "requirements"\n`;
  response += `  }\n`;
  response += `}\n`;
  response += `\`\`\`\n\n`;
  
  response += `### 2. Read System Architecture\n`;
  response += `Understand system context:\n`;
  response += `\`\`\`json\n`;
  response += `{\n`;
  response += `  "tool": "read",\n`;
  response += `  "args": {\n`;
  response += `    "projectRoot": "/path/to/your/project",\n`;
  response += `    "type": "system_architecture"\n`;
  response += `  }\n`;
  response += `}\n`;
  response += `\`\`\`\n\n`;
  
  response += `### 3. API Design Process\n`;
  response += `- Define API requirements\n`;
  response += `- Design resource models\n`;
  response += `- Define endpoints\n`;
  response += `- Design request/response formats\n`;
  response += `- Plan authentication\n`;
  response += `- Consider rate limiting\n`;
  response += `- Plan error handling\n`;
  response += `- Document API specification\n\n`;
  
  response += `### 4. API Design Components\n`;
  response += `#### Resource Design\n`;
  response += `- Resource identification\n`;
  response += `- Resource relationships\n`;
  response += `- Data models\n`;
  response += `- Validation rules\n\n`;
  
  response += `#### Endpoint Design\n`;
  response += `- HTTP methods (GET, POST, PUT, DELETE)\n`;
  response += `- URL structure\n`;
  response += `- Query parameters\n`;
  response += `- Request/response formats\n\n`;
  
  response += `#### Security Design\n`;
  response += `- Authentication methods\n`;
  response += `- Authorization rules\n`;
  response += `- API keys\n`;
  response += `- Rate limiting\n`;
  response += `- CORS policies\n\n`;
  
  response += `### 5. Update System Architecture Document\n`;
  response += `\`\`\`json\n`;
  response += `{\n`;
  response += `  "tool": "update",\n`;
  response += `  "args": {\n`;
  response += `    "projectRoot": "/path/to/your/project",\n`;
  response += `    "type": "system_architecture",\n`;
  response += `    "content": "# System Architecture\\n\\n## API Design\\n### ${apiType} ${version}\\n\\n## Endpoints\\n### Authentication\\n- **POST** /auth/login\\n- **POST** /auth/logout\\n- **POST** /auth/refresh\\n\\n### Users\\n- **GET** /users - List users\\n- **POST** /users - Create user\\n- **GET** /users/{id} - Get user\\n- **PUT** /users/{id} - Update user\\n- **DELETE** /users/{id} - Delete user\\n\\n### Resources\\n- **GET** /resources - List resources\\n- **POST** /resources - Create resource\\n- **GET** /resources/{id} - Get resource\\n- **PUT** /resources/{id} - Update resource\\n- **DELETE** /resources/{id} - Delete resource\\n\\n## Request/Response Format\\n### Request Headers\\n- Content-Type: application/json\\n- Authorization: Bearer {token}\\n\\n### Response Format\\n\\\`\`\`json\\n{\\n  "success": true,\\n  "data": {},\\n  "message": "Success",\\n  "timestamp": "2024-01-01T00:00:00Z"\\n}\\\`\`\`\\n\\n## Error Handling\\n- **400**: Bad Request\\n- **401**: Unauthorized\\n- **403**: Forbidden\\n- **404**: Not Found\\n- **500**: Internal Server Error\\n\\n## Rate Limiting\\n- **Requests per minute**: 100\\n- **Burst limit**: 10\\n\\n## Update History\\n- ${new Date().toISOString().split('T')[0]}: Created API design for ${apiType} ${version}"\n`;
  response += `  }\n`;
  response += `}\n`;
  response += `\`\`\`\n\n`;
  
  response += `💡 **API Design Tips**:\n`;
  response += `- Follow REST principles\n`;
  response += `- Use consistent naming conventions\n`;
  response += `- Plan for versioning\n`;
  response += `- Design for security\n`;
  response += `- Consider performance\n`;
  response += `- Document thoroughly\n`;
  
  return {
    messages: [{
      role: "user",
      content: { type: "text", text: response }
    }]
  };
}

// 4. Design Database Schema Prompt
export async function designDatabaseSchemaPrompt(args: {
  databaseType?: string;
  schemaType?: string;
}): Promise<{
  messages: Array<{ role: "user"; content: { type: "text"; text: string } }>;
}> {
  const databaseType = args.databaseType || 'Relational';
  const schemaType = args.schemaType || 'Normalized';
  
  let response = `🗄️ Database Schema Design Guide\n\n`;
  response += `🎯 Database Type: ${databaseType}\n`;
  response += `📊 Schema Type: ${schemaType}\n`;
  response += `📅 Date: ${new Date().toLocaleDateString()}\n\n`;
  
  response += `## Steps to Design Database Schema:\n\n`;
  
  response += `### 1. Read Requirements Document\n`;
  response += `Understand data requirements:\n`;
  response += `\`\`\`json\n`;
  response += `{\n`;
  response += `  "tool": "read",\n`;
  response += `  "args": {\n`;
  response += `    "projectRoot": "/path/to/your/project",\n`;
  response += `    "type": "requirements"\n`;
  response += `  }\n`;
  response += `}\n`;
  response += `\`\`\`\n\n`;
  
  response += `### 2. Read System Architecture\n`;
  response += `Understand system context:\n`;
  response += `\`\`\`json\n`;
  response += `{\n`;
  response += `  "tool": "read",\n`;
  response += `  "args": {\n`;
  response += `    "projectRoot": "/path/to/your/project",\n`;
  response += `    "type": "system_architecture"\n`;
  response += `  }\n`;
  response += `}\n`;
  response += `\`\`\`\n\n`;
  
  response += `### 3. Database Design Process\n`;
  response += `- Analyze data requirements\n`;
  response += `- Identify entities and relationships\n`;
  response += `- Design entity-relationship model\n`;
  response += `- Normalize database schema\n`;
  response += `- Plan indexes and constraints\n`;
  response += `- Consider performance optimization\n`;
  response += `- Plan for data migration\n`;
  response += `- Document schema design\n\n`;
  
  response += `### 4. Schema Design Components\n`;
  response += `#### Entity Design\n`;
  response += `- Primary entities\n`;
  response += `- Entity attributes\n`;
  response += `- Data types\n`;
  response += `- Constraints\n\n`;
  
  response += `#### Relationship Design\n`;
  response += `- One-to-one relationships\n`;
  response += `- One-to-many relationships\n`;
  response += `- Many-to-many relationships\n`;
  response += `- Foreign key constraints\n\n`;
  
  response += `#### Performance Design\n`;
  response += `- Index strategy\n`;
  response += `- Query optimization\n`;
  response += `- Partitioning strategy\n`;
  response += `- Caching strategy\n\n`;
  
  response += `### 5. Update System Architecture Document\n`;
  response += `\`\`\`json\n`;
  response += `{\n`;
  response += `  "tool": "update",\n`;
  response += `  "args": {\n`;
  response += `    "projectRoot": "/path/to/your/project",\n`;
  response += `    "type": "system_architecture",\n`;
  response += `    "content": "# System Architecture\\n\\n## Database Design\\n### ${databaseType} Database - ${schemaType} Schema\\n\\n## Database Schema\\n### Users Table\\n- **id**: UUID (Primary Key)\\n- **username**: VARCHAR(50) (Unique)\\n- **email**: VARCHAR(100) (Unique)\\n- **password_hash**: VARCHAR(255)\\n- **created_at**: TIMESTAMP\\n- **updated_at**: TIMESTAMP\\n\\n### Resources Table\\n- **id**: UUID (Primary Key)\\n- **name**: VARCHAR(100)\\n- **description**: TEXT\\n- **user_id**: UUID (Foreign Key)\\n- **created_at**: TIMESTAMP\\n- **updated_at**: TIMESTAMP\\n\\n## Relationships\\n- Users (1) → (N) Resources\\n- Users (1) → (N) Sessions\\n\\n## Indexes\\n- **users_email_idx**: ON users(email)\\n- **users_username_idx**: ON users(username)\\n- **resources_user_id_idx**: ON resources(user_id)\\n\\n## Constraints\\n- **users_email_unique**: UNIQUE(email)\\n- **users_username_unique**: UNIQUE(username)\\n- **resources_user_fk**: FOREIGN KEY(user_id) REFERENCES users(id)\\n\\n## Performance Considerations\\n- **Connection Pooling**: [Pool configuration]\\n- **Query Optimization**: [Optimization strategy]\\n- **Backup Strategy**: [Backup plan]\\n\\n## Update History\\n- ${new Date().toISOString().split('T')[0]}: Created database schema for ${databaseType} database"\n`;
  response += `  }\n`;
  response += `}\n`;
  response += `\`\`\`\n\n`;
  
  response += `💡 **Database Design Tips**:\n`;
  response += `- Start with requirements analysis\n`;
  response += `- Normalize appropriately\n`;
  response += `- Plan for scalability\n`;
  response += `- Consider performance\n`;
  response += `- Document relationships\n`;
  response += `- Plan for data migration\n`;
  
  return {
    messages: [{
      role: "user",
      content: { type: "text", text: response }
    }]
  };
}

// 5. Review Design Prompt
export async function designReviewPrompt(args: {
  reviewType?: string;
  designType?: string;
}): Promise<{
  messages: Array<{ role: "user"; content: { type: "text"; text: string } }>;
}> {
  const reviewType = args.reviewType || 'Comprehensive';
  const designType = args.designType || 'All Designs';
  
  let response = `🔍 Design Review Guide\n\n`;
  response += `📋 Review Type: ${reviewType}\n`;
  response += `🎨 Design Type: ${designType}\n`;
  response += `📅 Date: ${new Date().toLocaleDateString()}\n\n`;
  
  response += `## Steps to Review Design:\n\n`;
  
  response += `### 1. Read Requirements Document\n`;
  response += `Check against requirements:\n`;
  response += `\`\`\`json\n`;
  response += `{\n`;
  response += `  "tool": "read",\n`;
  response += `  "args": {\n`;
  response += `    "projectRoot": "/path/to/your/project",\n`;
  response += `    "type": "requirements"\n`;
  response += `  }\n`;
  response += `}\n`;
  response += `\`\`\`\n\n`;
  
  response += `### 2. Read Design Documents\n`;
  response += `Review current designs:\n`;
  response += `\`\`\`json\n`;
  response += `{\n`;
  response += `  "tool": "read",\n`;
  response += `  "args": {\n`;
  response += `    "projectRoot": "/path/to/your/project",\n`;
  response += `    "type": "ui_design"\n`;
  response += `  }\n`;
  response += `}\n`;
  response += `\`\`\`\n\n`;
  response += `\`\`\`json\n`;
  response += `{\n`;
  response += `  "tool": "read",\n`;
  response += `  "args": {\n`;
  response += `    "projectRoot": "/path/to/your/project",\n`;
  response += `    "type": "system_architecture"\n`;
  response += `  }\n`;
  response += `}\n`;
  response += `\`\`\`\n\n`;
  
  response += `### 3. Review Process\n`;
  response += `- Check design consistency\n`;
  response += `- Verify requirements compliance\n`;
  response += `- Assess technical feasibility\n`;
  response += `- Review scalability considerations\n`;
  response += `- Validate security aspects\n`;
  response += `- Check performance implications\n`;
  response += `- Review maintainability\n`;
  response += `- Document review findings\n\n`;
  
  response += `### 4. Review Checklist\n`;
  response += `#### UI Design Review\n`;
  response += `- [ ] Interface is intuitive\n`;
  response += `- [ ] Navigation is clear\n`;
  response += `- [ ] Actions are discoverable\n`;
  response += `- [ ] Feedback is immediate\n`;
  response += `- [ ] Accessibility compliance\n`;
  response += `- [ ] Responsive design\n`;
  response += `- [ ] Visual consistency\n`;
  response += `- [ ] Color contrast\n\n`;
  
  response += `#### System Architecture Review\n`;
  response += `- [ ] Architecture meets requirements\n`;
  response += `- [ ] Scalability is addressed\n`;
  response += `- [ ] Security is considered\n`;
  response += `- [ ] Performance is optimized\n`;
  response += `- [ ] Maintainability is planned\n`;
  response += `- [ ] Technology choices are appropriate\n`;
  response += `- [ ] Integration points are clear\n`;
  response += `- [ ] Deployment strategy is defined\n\n`;
  
  response += `#### API Design Review\n`;
  response += `- [ ] API follows REST principles\n`;
  response += `- [ ] Endpoints are well-defined\n`;
  response += `- [ ] Authentication is implemented\n`;
  response += `- [ ] Error handling is comprehensive\n`;
  response += `- [ ] Rate limiting is planned\n`;
  response += `- [ ] Documentation is complete\n`;
  response += `- [ ] Versioning strategy is clear\n`;
  response += `- [ ] Security measures are in place\n\n`;
  
  response += `#### Database Design Review\n`;
  response += `- [ ] Schema is normalized appropriately\n`;
  response += `- [ ] Relationships are well-defined\n`;
  response += `- [ ] Indexes are optimized\n`;
  response += `- [ ] Constraints are properly set\n`;
  response += `- [ ] Performance is considered\n`;
  response += `- [ ] Backup strategy is planned\n`;
  response += `- [ ] Data migration is considered\n`;
  response += `- [ ] Security is implemented\n\n`;
  
  response += `### 5. Update Design Documents\n`;
  response += `\`\`\`json\n`;
  response += `{\n`;
  response += `  "tool": "update",\n`;
  response += `  "args": {\n`;
  response += `    "projectRoot": "/path/to/your/project",\n`;
  response += `    "type": "notes",\n`;
  response += `    "content": "# Design Review Report\\n\\n## Review Summary\\n- **Review Type**: ${reviewType}\\n- **Design Type**: ${designType}\\n- **Review Date**: ${new Date().toLocaleDateString()}\\n\\n## Review Results\\n### UI Design\\n- **Usability**: [Status]\\n- **Accessibility**: [Status]\\n- **Responsive Design**: [Status]\\n- **Visual Design**: [Status]\\n\\n### System Architecture\\n- **Requirements Compliance**: [Status]\\n- **Scalability**: [Status]\\n- **Security**: [Status]\\n- **Performance**: [Status]\\n\\n### API Design\\n- **REST Compliance**: [Status]\\n- **Security**: [Status]\\n- **Documentation**: [Status]\\n- **Error Handling**: [Status]\\n\\n### Database Design\\n- **Normalization**: [Status]\\n- **Performance**: [Status]\\n- **Security**: [Status]\\n- **Scalability**: [Status]\\n\\n## Issues Found\\n- [Issue 1]\\n- [Issue 2]\\n- [Issue 3]\\n\\n## Recommendations\\n- [Recommendation 1]\\n- [Recommendation 2]\\n- [Recommendation 3]\\n\\n## Action Items\\n- [ ] [Action item 1]\\n- [ ] [Action item 2]\\n- [ ] [Action item 3]\\n\\n## Update History\\n- ${new Date().toISOString().split('T')[0]}: Design review completed for ${designType}"\n`;
  response += `  }\n`;
  response += `}\n`;
  response += `\`\`\`\n\n`;
  
  response += `💡 **Design Review Tips**:\n`;
  response += `- Review against requirements\n`;
  response += `- Consider technical feasibility\n`;
  response += `- Assess scalability implications\n`;
  response += `- Check security aspects\n`;
  response += `- Document all findings\n`;
  response += `- Prioritize critical issues\n`;
  response += `- Plan for improvements\n`;
  response += `- Consider stakeholder feedback\n`;
  
  return {
    messages: [{
      role: "user",
      content: { type: "text", text: response }
    }]
  };
}
