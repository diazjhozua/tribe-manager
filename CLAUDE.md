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

## Important Files

- `Aggregates.md` - Comprehensive domain model documentation with JSON examples
- `tribe-manager.api/Controllers/ApiController.cs` - Base controller with ErrorOr pattern
- `tribe-manager.domain/Common/Models/` - Base classes for DDD building blocks

## Dependencies

- **.NET 8.0** - Runtime and framework
- **ErrorOr** - Functional error handling
- **Swashbuckle** - API documentation
- **Nullable reference types** enabled across all projects