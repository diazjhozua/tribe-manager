# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Architecture Overview

This is a **Domain-Driven Design (DDD)** implementation of a tribe management system using **Clean Architecture** principles with .NET 8.0. The solution is organized into distinct layers with clear separation of concerns.

### Project Structure
```
tribe-manager.sln
├── tribe-manager.api/          # Web API layer (ASP.NET Core)
├── tribe-manager.application/  # Application layer (Use cases, CQRS)
├── tribe-manager.contracts/    # API contracts and DTOs
├── tribe-manager.domain/       # Domain layer (Aggregates, Entities, Value Objects)
├── tribe-manager.infrastructure/ # Infrastructure layer (Persistence, External services)
└── Aggregates.md              # Domain model documentation
```

### Domain Model

The domain follows **aggregate-per-folder** structure with four core aggregates:

#### `/tribe-manager.domain/[Aggregate]/`
- **User/**: Authentication, profiles, preferences, security settings
- **Tribe/**: Team management, member roles, permissions, point tracking
- **Task/**: Work items, subtasks, comments, attachments, status workflow
- **Shop/**: Rewards marketplace, purchase workflow, inventory management

Each aggregate folder contains:
- `Entities/` - Domain entities including aggregate roots
- `ValueObjects/` - Immutable value objects with validation
- `Enums/` - Domain-specific enumerations

### Key Design Patterns

#### Strongly-Typed IDs
All aggregates use strongly-typed identifiers:
```csharp
UserId, TribeId, TaskId, ShopId, RewardItemId, PurchaseId
```

#### Rich Domain Models
Entities contain business logic and enforce invariants:
- User authentication and profile management
- Tribe membership and permission validation
- Task lifecycle and completion tracking
- Shop purchase workflow and inventory management

#### Value Objects
Complex domain concepts are modeled as value objects:
- `Email` with validation
- `PointsCost` with range constraints
- `UserProfile`, `TribeSettings`, `RewardDetails`

#### Error Handling
Uses ErrorOr pattern for functional error handling in controllers.

### Point System Architecture

The system implements a comprehensive gamification model:

1. **Earning Points**: Users earn points by completing tasks/subtasks
2. **Point Distribution**: Automatic splitting among multiple assignees
3. **Point Tracking**: Per-member history with sprint cycles
4. **Point Spending**: Rewards marketplace with approval workflows

### Business Rules

Key domain invariants enforced:
- Task points must equal sum of subtask points
- Only tribe members can be assigned tribe tasks
- Shop purchases validate point balance and inventory
- Approval workflows for high-value rewards
- Automatic point splitting for collaborative work

## Development Commands

### Building
```bash
# Build entire solution
dotnet build

# Build specific project
dotnet build tribe-manager.domain
dotnet build tribe-manager.api

# Clean and rebuild
dotnet clean && dotnet build
```

### Running
```bash
# Run API project
dotnet run --project tribe-manager.api

# Run with specific environment
dotnet run --project tribe-manager.api --environment Development
```

### Testing
```bash
# Run all tests (when test projects exist)
dotnet test

# Run tests for specific project
dotnet test tribe-manager.domain.tests
```

## Domain Development Guidelines

### Adding New Aggregates
1. Create folder structure: `[AggregateName]/{Entities,ValueObjects,Enums}/`
2. Implement aggregate root inheriting from `AggregateRoot<TId>`
3. Create strongly-typed ID value object
4. Document in `Aggregates.md`

### Aggregate Boundaries
- **User**: Authentication, profile, preferences
- **Tribe**: Team composition, roles, member point tracking
- **Task**: Work items, lifecycle, collaboration features
- **Shop**: Rewards catalog, purchase workflow, inventory

### Value Object Creation
Inherit from `ValueObject` base class and implement `GetEqualityComponents()`:
```csharp
public sealed class Email : ValueObject
{
    public override IEnumerable<object> GetEqualityComponents()
    {
        yield return Value;
    }
}
```

### Entity Relationships
- Use strongly-typed IDs for references between aggregates
- Avoid direct object references across aggregate boundaries
- Maintain consistency within aggregate boundaries only

## Development Workflow Patterns

### Adding New Features
1. **Define Domain Model**: Start with aggregate/entity design in `tribe-manager.domain`
2. **Create Contracts**: Add request/response DTOs in `tribe-manager.contracts`
3. **Implement Commands**: Create command, handler, and validator in `tribe-manager.application`
4. **Add Controller**: Implement API endpoints in `tribe-manager.api`
5. **Configure Mappings**: Add Mapster configuration in `Common/Mapping/`

### Controller Implementation Pattern
Controllers should follow this pattern:
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

### Error Handling Strategy
- **Domain Errors**: Define in `tribe-manager.domain/Common/Errors/`
- **Validation Errors**: Use FluentValidation attributes
- **Controller Errors**: Let ApiController.Problem() handle ErrorOr conversion

## Important Files

- `Aggregates.md` - Comprehensive domain model documentation with JSON examples
- `tribe-manager.api/Controllers/ApiController.cs` - Base controller with ErrorOr pattern
- `tribe-manager.domain/Common/Models/` - Base classes for DDD building blocks

## CQRS and MediatR Architecture

### Command/Query Structure
Commands and queries follow this structure in `tribe-manager.application/Services/[Domain]/`:
```
Commands/
├── [CommandName]/
    ├── [CommandName]Command.cs       # Command record
    ├── [CommandName]CommandHandler.cs # MediatR handler implementation
    └── [CommandName]CommandValidator.cs # FluentValidation rules
```

### MediatR Pipeline
- **ValidationBehavior**: Automatic FluentValidation integration using ErrorOr pattern
- **ErrorOr Integration**: All handlers return `ErrorOr<TResult>` for functional error handling
- **Request/Response Pattern**: Commands return domain results, not HTTP responses

### Authentication Implementation
The authentication system demonstrates the full CQRS pipeline:
- `LoginCommand`/`RegisterCommand` with validation
- `AuthenticationResult` as domain response
- JWT token generation with user claims
- Repository pattern for User aggregate persistence

## API Layer Architecture

### Controller Pattern
- **ApiController Base**: Shared error handling with ErrorOr → HTTP status mapping
- **Mapster Integration**: Automatic DTO ↔ Command/Response mapping
- **Error Handling**: RFC 7807 Problem Details for validation and domain errors

### Mapping Configuration
Mapster mappings are auto-discovered via `IRegister` implementations:
```csharp
public class AuthenticationMappingConfig : IRegister
{
    public void Register(TypeAdapterConfig config)
    {
        config.NewConfig<LoginRequest, LoginCommand>();
        config.NewConfig<RegisterRequest, RegisterCommand>();
        config.NewConfig<AuthenticationResult, AuthenticationResponse>()
            .Map(dest => dest.Id, src => src.UserId);
    }
}
```

### Dependency Injection Structure
Each layer has its own `DependencyInjection.cs`:
- **API Layer**: `AddPresentation()` - Controllers, Swagger, Mapster
- **Application Layer**: `AddApplication()` - MediatR, Behaviors, Validators
- **Infrastructure Layer**: `AddInfrastructure()` - Repositories, External services

## Dependencies

- **.NET 8.0** - Runtime and framework
- **MediatR** (13.1.0) - CQRS mediator pattern
- **ErrorOr** (2.0.1) - Functional error handling
- **FluentValidation** (12.1.0) - Command validation
- **Mapster** (7.4.0) - High-performance object mapping
- **Swashbuckle** (6.6.2) - API documentation
- **Entity Framework Core** (8.0.22) - Data access (Design package)
- **Nullable reference types** enabled across all projects