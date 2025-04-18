flowchart TD
    subgraph Nextjs_App
        A[App Router src/app/]
        B[API Routes Placeholder]
        C[Frontend Pages and Components Placeholder]
    end

    subgraph Backend
        D[User Service src/lib/services/userService.ts]
        E[Auth Service Placeholder]
        F[Additional Services Email, Logging, etc. Placeholder]
    end

    subgraph Data
        G[MongoDB docker-compose]
        H[MongoDB Client src/lib/clients/mongoClient.ts]
        I[User Types src/lib/types/userTypes.ts]
        J[.env.local MONGODB_URI]
    end

    subgraph Testing
        K[Unit Tests Placeholder]
        L[Integration Tests Placeholder]
    end

    %% Relationships
    A -->|calls| B
    B -->|uses| D
    D -->|uses| H
    H -->|connects to| G
    D -->|uses| I
    H -->|reads| J
    D -->|planned| E
    D -->|planned| F
    A -->|planned| C
    D -->|tested by| K
    B -->|tested by| L