# Clean Architecture in DIGITEFA Backend

Our NestJS backend follows Clean Architecture principles to ensure the system is independent of frameworks, databases, and external agencies.

## Layers

1.  **Domain Layer (Entities & Interfaces)**
    *   Located in `src/domain` or mapped via Prisma models in `prisma/schema`.
    *   Contains the enterprise business rules (e.g., TalentProfile, Application Status rules).
    *   Defines interfaces for repositories to decouple from Prisma.

2.  **Use Case Layer (Services)**
    *   Located in `src/{module}/services`.
    *   Contains application-specific business rules.
    *   Example: `ApplyForJobUseCase`, `GenerateRecommendationUseCase`.
    *   Depends only on Domain layer and repository interfaces.

3.  **Interface Adapters (Controllers & DTOs)**
    *   Located in `src/{module}/controllers` and `src/{module}/dtos`.
    *   Converts data from the format most convenient for Use Cases (Domain) to the format most convenient for external agencies (Web APIs).
    *   Handles HTTP Requests, parses payloads, validates DTOs, and returns mapped standard API responses (`ApiResponse<T>`).

4.  **Frameworks & Drivers (Infrastructure)**
    *   Includes Prisma Client (`src/prisma/prisma.service.ts`), NestJS core bootstrapping, Authentication Guards (`RolesGuard`), error filters, and external API clients (e.g., Axios client for FastAPI AI Service).
    *   Kept at the outermost layer.

## Dependency Rule
Dependencies only point inwards. Outer layers (Controllers) depend on inner layers (Services), which depend on innermost layers (Domain/Entities).

## Module Structure Example
```text
JobModule/
 ├─ controllers/
 │   └─ job.controller.ts     // Handles routing/REST mapping
 ├─ dtos/
 │   ├─ create-job.dto.ts     // Validation
 │   └─ job-response.dto.ts
 ├─ services/
 │   └─ job.service.ts        // Core app logic
 └─ job.module.ts             // NestJS DI configuration
```
