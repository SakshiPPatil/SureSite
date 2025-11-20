# SureSite - AI-Powered Website Builder

SureSite is a comprehensive website builder that combines AI-powered generation with advanced project management, form building, reporting, and dashboard capabilities. Built with React.js frontend and Python FastAPI backend.

## 🚀 Features

### Core Website Building
- **AI-Powered Generation**: Generate complete websites from natural language prompts
- **Live Preview**: Real-time preview of generated websites
- **Code Editor**: View and edit generated HTML, CSS, and JavaScript
- **Template System**: Pre-built templates for various website types
- **Prototype Management**: Multiple versions and iterations of your websites

### Project Management
- **Project Organization**: Create and manage multiple website projects
- **Project History**: Track changes and versions
- **Technology Stack Management**: Support for various tech stacks
- **Project Templates**: Reusable project configurations

### Form Builder (Wireframes)
- **Dynamic Form Creation**: Build complex forms with drag-and-drop interface
- **Form Templates**: Pre-built form templates for common use cases
- **Field Management**: Configure form fields with validation rules
- **Database Integration**: Automatic database table generation
- **Form Preview**: Live preview of forms before deployment

### Reports & Analytics
- **Custom Reports**: Create data-driven reports with SQL queries
- **Report Templates**: Pre-built report templates
- **Chart Integration**: Visualize data with charts and graphs
- **Export Options**: Export reports in various formats (PDF, Excel, CSV)
- **Scheduled Reports**: Automated report generation

### Dashboard Builder
- **Interactive Dashboards**: Create real-time data dashboards
- **Widget Library**: Pre-built widgets for charts, tables, and metrics
- **Customizable Layouts**: Drag-and-drop dashboard layout editor
- **Theme Support**: Multiple dashboard themes
- **Real-time Updates**: Live data refresh capabilities

### User Management
- **User Authentication**: Secure login and registration
- **Role-based Access**: User roles and permissions
- **Profile Management**: User profile settings
- **Security Features**: Two-factor authentication, password policies

## 🛠️ Technology Stack

### Frontend
- **React.js**: Modern React with TypeScript
- **Next.js**: React framework for production
- **CSS3**: Custom styling with CSS variables and themes
- **Responsive Design**: Mobile-first approach

### Backend
- **Python**: Core backend language
- **FastAPI**: Modern, fast web framework
- **SQLAlchemy**: ORM for database operations
- **Pydantic**: Data validation and serialization
- **PostgreSQL**: Primary database
- **Redis**: Caching and sessions
- **JWT**: Authentication and authorization

## 📁 Project Structure

```
suresite/
├── frontend/                 # React.js frontend
│   ├── src/
│   │   ├── components/       # React components
│   │   ├── pages/           # Page components
│   │   ├── services/        # API services
│   │   └── styles/          # CSS styles
│   └── package.json
├── backend/                  # Python FastAPI backend
│   ├── app/
│   │   ├── api/             # API endpoints
│   │   ├── models/          # Database models
│   │   ├── schemas/         # Pydantic schemas
│   │   ├── services/        # Business logic
│   │   └── core/            # Core configuration
│   └── requirements.txt
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ and npm
- Python 3.8+
- PostgreSQL database
- Redis (optional, for caching)

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### Backend Setup
```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### Environment Variables
Create `.env` files in both frontend and backend directories:

**Frontend (.env.local)**
```
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here
```

**Backend (.env)**
```
DATABASE_URL=postgresql://user:password@localhost/suresite
SECRET_KEY=your-secret-key
REDIS_URL=redis://localhost:6379
OPENAI_API_KEY=your_openai_api_key_here
ANTHROPIC_API_KEY=your_anthropic_api_key_here
```

> **Note**: To use the Gemini AI features, you need to obtain a Gemini API key from [Google AI Studio](https://aistudio.google.com/). If you don't configure the Gemini API key, the application will automatically fall back to using the backend AI services.

## 📖 Usage Guide

### 1. Creating a Website
1. Navigate to the home page
2. Enter your website description in the AI Assistant
3. Click "Generate" to create your website
4. Preview the result in the live preview panel
5. Edit code if needed in the code editor
6. Save your project

### 2. Managing Projects
1. Go to "Projects" from the menu
2. Click "New Project" to create a new project
3. Fill in project details (name, description, tech stack)
4. View and manage your projects in the project grid

### 3. Building Forms
1. Navigate to "Form Builder" from the menu
2. Click "New Form" to create a form
3. Configure form fields and validation rules
4. Preview the form in real-time
5. Save and deploy the form

### 4. Creating Reports
1. Go to "Reports" from the menu
2. Click "New Report" to create a report
3. Write SQL queries or use the query builder
4. Configure charts and visualizations
5. Set up export options and scheduling

### 5. Building Dashboards
1. Navigate to "Dashboards" from the menu
2. Click "New Dashboard" to create a dashboard
3. Add widgets and configure data sources
4. Customize layout and theme
5. Set refresh intervals for real-time updates

## 🔧 API Endpoints

### Core Endpoints
- `GET /api/v1/health` - Health check
- `POST /api/v1/generate` - Generate website from prompt

### Project Management
- `GET /api/v1/projects` - Get all projects
- `POST /api/v1/projects` - Create new project
- `GET /api/v1/projects/{id}` - Get project by ID
- `PUT /api/v1/projects/{id}` - Update project
- `DELETE /api/v1/projects/{id}` - Delete project

### Form Builder
- `GET /api/v1/wireframe` - Get wireframes
- `POST /api/v1/wireframe` - Create wireframe
- `GET /api/v1/form-templates/templates` - Get form templates
- `POST /api/v1/form-templates/templates` - Create form template

### Reports
- `GET /api/v1/reports` - Get reports
- `POST /api/v1/reports` - Create report
- `POST /api/v1/reports/{id}/execute` - Execute report
- `POST /api/v1/reports/{id}/export` - Export report

### Dashboards
- `GET /api/v1/dashboards` - Get dashboards
- `POST /api/v1/dashboards` - Create dashboard
- `POST /api/v1/dashboards/{id}/refresh` - Refresh dashboard
- `PUT /api/v1/dashboards/{id}/layout` - Update layout

### User Management
- `POST /api/v1/auth/login` - User login
- `POST /api/v1/auth/register` - User registration
- `GET /api/v1/user-profile/profile` - Get user profile
- `PUT /api/v1/user-profile/profile` - Update profile

## 🎨 Themes and Customization

SureSite supports both light and dark themes with:
- Automatic theme detection
- Manual theme switching
- Persistent theme preferences
- Customizable color schemes
- Responsive design across all screen sizes

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Role-based access control
- Input validation and sanitization
- CORS configuration
- Rate limiting
- SQL injection prevention

## 📊 Performance Optimization

- Database query optimization
- Redis caching for frequently accessed data
- Lazy loading of components
- Image optimization
- Code splitting
- CDN integration support

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue in the GitHub repository
- Check the documentation in the `/docs` folder
- Contact the development team

## 🔄 Version History

### v1.0.0 (Current)
- Initial release with core website building features
- AI-powered website generation
- Project management system
- Form builder with templates
- Reports and dashboard functionality
- User management and authentication
- Responsive design and theme support

## 🚧 Roadmap

### Upcoming Features
- [ ] Advanced AI models integration
- [ ] E-commerce template support
- [ ] Multi-language support
- [ ] Advanced analytics
- [ ] Team collaboration features
- [ ] API marketplace
- [ ] Mobile app development
- [ ] Advanced deployment options

---

**Built with ❤️ by the SureSite Team**
