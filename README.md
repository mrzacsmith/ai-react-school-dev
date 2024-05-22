# React Component Toolkit

This toolkit is designed to streamline the development of React components by automating the creation of JSX components, documentation, and unit tests. It leverages the LangChain framework to integrate natural language processing capabilities, making it possible to generate code and documentation through conversational interfaces.

## Features

- **Component Creation**: Automatically generates React component code based on detailed descriptions.
- **Documentation Generation**: Produces comprehensive markdown documentation for each component.
- **Unit Test Creation**: Generates unit tests to ensure component functionality meets specified behaviors.
- **File Management**: Manages the creation and storage of files with appropriate extensions based on content type.
- **Directory Management**: Handles the creation and permissions setting for directories.

## Tools and Libraries

- **LangChain and LangChain-OpenAI**: Used for integrating OpenAI models with custom development tools, providing a framework for building interactive AI agents.
- **LangSmith**: Provides traceability features to enhance debugging and development workflows.
- **Python Standard Libraries (`os`, `subprocess`)**: Facilitates file and directory operations.
- **Dotenv**: Manages environment variables.

## Setup

1. **Environment Variables**: Load necessary configurations using `load_dotenv`.
2. **Tool Definitions**: Define tools using the `@tool` decorator, enabling integration with LangChain's agent framework.
3. **Agent and Executor Setup**: Configure the agent with prompts and bind tools for operation. The executor manages the flow of data through the agent.

## Usage

After configuring the environment and tools, use the interactive command prompt to specify details for creating React components, documentation, or unit tests. The system uses these details to generate the necessary files.

```plaintext
To create a React component, please provide the following details:
1. Component Name
2. Props (list the props)
3. State Management (yes/no)
4. Styling (CSS modules/inline styles/other)
5. Dependencies (list any external libraries)
6. Default Content (structure of the component)
7. Interactions (events the component should handle)
