# Tribe Manager

A comprehensive tribe management system built with Domain-Driven Design (DDD) and Clean Architecture principles. The system enables teams to manage members, track tasks with gamified point systems, and operate a rewards marketplace.

## 🏗️ Architecture

This solution implements **Domain-Driven Design (DDD)** with **Clean Architecture** using .NET 8.0 backend and React frontend.

### Project Structure

```
tribe-manager.sln
├── tribe-manager.api/          # Web API layer (ASP.NET Core)
├── tribe-manager.application/  # Application layer (CQRS, MediatR)
├── tribe-manager.contracts/    # API contracts and DTOs
├── tribe-manager.domain/       # Domain layer (Aggregates, Entities, Value Objects)
├── tribe-manager.infrastructure/ # Infrastructure layer (Persistence, External services)
├── tribe-manager.web/          # React frontend (Chakra UI, TypeScript)
└── Aggregates.md              # Domain model documentation
```

## 🎯 Core Features

### Domain Aggregates

- **👤 User**: Authentication, profiles, preferences, security settings
- **👥 Tribe**: Team management, member roles, permissions, point tracking
- **📋 Task**: Work items, subtasks, comments, attachments, status workflow
- **🛒 Shop**: Rewards marketplace, purchase workflow, inventory management

### Key Capabilities

- **Gamification System**: Point-based rewards for task completion
- **Team Management**: Role-based permissions and member administration
- **Task Workflow**: Complete lifecycle management with collaboration features
- **Rewards Marketplace**: Point redemption system with approval workflows

## 🚀 Getting Started

### Prerequisites

- [.NET 8.0 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
- [Node.js 18+](https://nodejs.org/) (for frontend)

### Backend Setup

1. **Clone and build the solution**:
   ```bash
   git clone <repository-url>
   cd tribe-manager
   dotnet build
   ```

2. **Run the API**:
   ```bash
   dotnet run --project tribe-manager.api
   ```

   The API will be available at `https://localhost:7000` with Swagger documentation.

### Frontend Setup

1. **Navigate to web project and install dependencies**:
   ```bash
   cd tribe-manager.web
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm run dev
   ```

   The React app will be available at `http://localhost:5173`.

## 🛠️ Development

### Building

```bash
# Build entire solution
dotnet build

# Build specific project
dotnet build tribe-manager.api
dotnet build tribe-manager.domain

# Clean and rebuild
dotnet clean && dotnet build
```

### Frontend Development

```bash
# Development server
npm run dev

# Build for production
npm run build

# Lint code
npm run lint

# Preview production build
npm run preview
```

## 🏛️ Technical Stack

### Backend

- **.NET 8.0** - Runtime and framework
- **MediatR** (13.1.0) - CQRS mediator pattern
- **ErrorOr** (2.0.1) - Functional error handling
- **FluentValidation** (12.1.0) - Input validation
- **Mapster** (7.4.0) - Object mapping
- **Entity Framework Core** (8.0.22) - Data access
- **Swashbuckle** (6.6.2) - API documentation

### Frontend

- **React 19.1** - UI framework
- **TypeScript 5.8** - Type safety
- **Vite 7.1** - Build tool and dev server
- **Chakra UI 3.28** - Component library
- **React Router 7.9** - Client-side routing
- **Emotion** - CSS-in-JS styling

## 📋 API Endpoints

### Authentication

- `POST /api/authentication/login` - User login
- `POST /api/authentication/register` - User registration

### Error Handling

All API endpoints use the **ErrorOr pattern** with standardized error responses following RFC 7807 Problem Details format.

## 🎮 Point System

The gamification system includes:

1. **Earning Points**: Users earn points by completing tasks/subtasks
2. **Point Distribution**: Automatic splitting among multiple assignees
3. **Point Tracking**: Per-member history with sprint cycles
4. **Point Spending**: Rewards marketplace with approval workflows

## 📖 Domain Rules

Key business invariants:

- Task points must equal sum of subtask points
- Only tribe members can be assigned tribe tasks
- Shop purchases validate point balance and inventory
- Approval workflows for high-value rewards
- Automatic point splitting for collaborative work

## 📚 Documentation

- **[CLAUDE.md](./CLAUDE.md)** - Developer guidance and architectural patterns
- **[Aggregates.md](./Aggregates.md)** - Comprehensive domain model with examples

## 🔧 Development Patterns

### CQRS Implementation

Commands and queries follow this structure:
```
Services/[Domain]/Commands/[CommandName]/
├── [CommandName]Command.cs
├── [CommandName]CommandHandler.cs
└── [CommandName]CommandValidator.cs
```

### Controller Pattern

```csharp
[HttpPost("endpoint")]
public async Task<IActionResult> Action([FromBody] RequestDto request)
{
    var command = _mapper.Map<Command>(request);
    var result = await _mediator.Send(command);
    return result.Match(
        success => Ok(_mapper.Map<ResponseDto>(success)),
        errors => Problem(errors));
}
```

## 🤝 Contributing

1. Follow Domain-Driven Design principles
2. Use strongly-typed IDs for aggregate references
3. Implement command validation using FluentValidation
4. Add Mapster configurations for new DTOs
5. Update domain documentation in `Aggregates.md`

## 📄 License

This project is licensed under the MIT License.