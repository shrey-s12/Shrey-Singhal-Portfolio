Frontend Engineering Guidelines

1. State Management

* Avoid redundant or duplicate state. Every piece of state should have a single source of truth.
* Prefer derived state over synchronizing multiple states with useEffect.
* Move state up only when it is shared by multiple components.
* Keep local state inside the component that owns it. Do not lift state unnecessarily.
* For complex state management driven by API responses or business rules, encapsulate the logic inside custom hooks.

2. Effects (useEffect)

* Every useEffect should have a clear purpose. Always ask:
    * Why is this effect needed?
    * Can this be computed during render instead?
    * Can it be replaced with derived state or memoization?
* Avoid effects that synchronize two pieces of state.
* Keep dependency arrays minimal, accurate, and stable.
* Avoid dependencies that change unnecessarily due to recreated objects or functions.
* Prefer custom hooks over placing complex effects directly inside components.

3. Component Design

* Keep components small, focused, and composable.
* Break large components into smaller reusable components.
* Each component should have a single responsibility.
* Pass only the props a component actually needs.
* Keep component dependencies explicit and relevant.

4. Custom Hooks

Use custom hooks for:

* API interaction and data fetching.
* Data transformation and normalization.
* Complex state management.
* Reusable side effects.
* Shared business logic.

Keep components focused on rendering UI rather than orchestrating business logic.

5. JSX

* Keep JSX declarative and easy to read.
* Avoid complex business logic inside JSX.
* Avoid deeply nested ternary operators.
* Extract repeated or conditional rendering into helper components or functions.
* Compose UI from smaller components rather than large JSX blocks.

6. Separation of Concerns

Keep different types of logic clearly separated.

Page Components

* Routing
* Page composition
* High-level orchestration

Custom Hooks

* API contracts
* Data fetching
* Business logic
* Complex state management
* Shared effects

Components

* Rendering
* UI interactions
* Derived state
* Event handlers

This separation makes the codebase easier to understand, test, and maintain.

7. Naming

* Use semantic names that describe intent.
* Event handlers should clearly describe the action (handleSave, handleDelete, handleSearch).
* Props should describe their purpose rather than implementation details.
* Components must use PascalCase.
* Hooks must start with use.
* Never prefix regular functions or variables with use.
* Constants should use UPPER_SNAKE_CASE.

8. Constants

* Avoid inline string literals and magic values.
* Extract reusable values into named constants.
* Reuse constants instead of duplicating strings throughout the codebase.

9. Code Organization

Organize code by responsibility rather than convenience.

Examples:

* API contracts → data layer/custom hooks
* Business logic → custom hooks
* Routing → page-level components
* UI components → presentation
* Shared utilities → utility modules
* Constants → constants files

10. PR Review Checklist

Before approving a PR, verify the following:

State

* No redundant state.
* Derived state is preferred over synchronized state.
* State ownership is appropriate.

Effects

* Every effect has a clear justification.
* No unnecessary effects.
* Dependency arrays are accurate and stable.
* Effects are not synchronizing state.

Components

* Components are small and composable.
* Large components have been split where appropriate.
* Props are minimal and meaningful.

Custom Hooks

* API logic lives in custom hooks.
* Complex business logic is extracted from components.
* Shared effects are reusable.

JSX

* JSX is clean and readable.
* No complex logic inside JSX.
* No deeply nested ternary operators.

Naming & Structure

* Semantic naming is used throughout.
* Constants are extracted.
* Files follow the project’s organization conventions.

Guiding Principle

The primary goal is to make the code easy to read, reason about, test, and maintain. Whenever adding state or an effect, first ask whether the same outcome can be achieved with simpler, more declarative code.