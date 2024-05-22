import os
import subprocess
from dotenv import load_dotenv
from langchain_openai import ChatOpenAI
from langchain.agents import AgentExecutor
from langchain.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain.tools import tool
from langsmith import traceable
from langchain.agents.format_scratchpad.openai_tools import (
    format_to_openai_tool_messages,
)
from langchain.agents.output_parsers.openai_tools import OpenAIToolsAgentOutputParser

load_dotenv()


# Define the updated create_react_component tool

@tool
def create_react_component(details: str):
    """
    Creates a JSX representation for a new React component based on the specified details.

    Parameters:
    - details (str): A comprehensive description of the React component, encompassing the component name,
                     type, properties, state management, styling, dependencies, default content, and user interactions.

    Returns:
    str: The JSX code for the React component without additional comments or data.
    """

    prompt = f"Create a React functional component with the following details:\n{details}\n"
    llm_response = llm.invoke(prompt)
    return llm_response


# Define the create_component_documentation tool

@tool
def build_component_documentation():
    """
    Creates documentation for the new React component.

    Parameters:
    - details (str): The details of the React component for which the documentation will be created.

    Returns:
    str: The generated documentation.
    """
    # prompt = f"Create documentation for a React component with the following details:\n{details}\n"
    # llm_response = llm.call(prompt)
    return 'create docs'


# Define the create_unit_test tool

@tool
def create_unit_test():
    """
    Creates unit tests for the new React component.

    Parameters:
    - details (str): The details of the React component for which the unit tests will be created.

    Returns:
    str: The generated unit tests.
    """
    # prompt = f"Create unit tests for a React component with the following details:\n{details}\n"
    # llm_response = llm.call(prompt)
    return 'create unit tests'


# Define the save_to_directory tool

@tool
def save_to_directory(directory: str, filename: str, content: str, file_type: str) -> str:
    """
    Creates and saves a file with the given content based on the specified file type in the specified directory.
    The file extension is determined by the type of content:
    - 'jsx' for React components, saved with a .jsx extension.
    - 'documentation' for markdown documents, saved with a .md extension.
    - 'unit_test' for JavaScript unit tests, saved with a .js extension.

    Parameters:
    - directory (str): The directory where the file will be saved.
    - filename (str): The name of the file to be saved, without extension.
    - content (str): The content to be saved in the file.
    - file_type (str): The type of the file, which dictates the file extension and can be 'jsx', 'documentation', or 'unit_test'.

    Returns:
    str: A message indicating the success or failure of the file saving process.
    """
    # Define the file extension based on the file_type
    extensions = {
        'react': '.jsx',
        'documentation': '.md',
        'unit_test': '.js'
    }
    file_extension = extensions.get(file_type, '.txt')  # Default to .txt if file_type is unrecognized

    # Ensure directory exists
    os.makedirs(directory, exist_ok=True)

    # Complete file path with the appropriate extension
    file_path = os.path.join(directory, f"{filename}{file_extension}")

    try:
        # Save the content to the file
        with open(file_path, 'w') as file:
            file.write(content)
        return f"File '{filename}{file_extension}' successfully saved in '{directory}'."
    except Exception as e:
        return f"An error occurred while saving the file: {e}"



@tool
def create_component_directory(directory: str) -> str:
    """
    Create a new writable directory with the given directory name if it does not exist.
    If the directory exists, it ensures the directory is writable.

    Parameters:
    directory (str): The name of the directory to create.

    Returns:
    str: Success or error message.
    """
    if ".." in directory:
        return f"Cannot make a directory with '..' in path"
    try:
        os.makedirs(directory, exist_ok=True)
        subprocess.run(["chmod", "u+w", directory], check=True)
        return f"Directory successfully '{directory}' created and set as writeable."
    except subprocess.CalledProcessError as e:
        return f"Failed to create or set writable directory '{directory}': {e}"
    except Exception as e:
        return f"An unexpected error occurred: {e}"


# List of tools
tools = [
    create_react_component,
    create_component_directory,
    save_to_directory

]

# Configure the llm
llm = ChatOpenAI(model='gpt-4o', temperature=0)

# Set up prompt template
prompt = ChatPromptTemplate.from_messages(
    [
        ("system", "You are an expert developer in React 18 and JavaScript."),
        ("user", "{input}"),
        MessagesPlaceholder(variable_name='agent_scratchpad'),
    ]
)

# Bind tools to llm
llm_with_tools = llm.bind_tools(tools)

# Define the agent
agent = (
        {
            "input": lambda x: x["input"],
            "agent_scratchpad": lambda x: format_to_openai_tool_messages(
                x["intermediate_steps"]
            ),
        }
        | prompt
        | llm_with_tools
        | OpenAIToolsAgentOutputParser()
)

# Define the executor
agent_executor = AgentExecutor(agent=agent, tools=tools, verbose=True)


# User prompt loop
def print_help():
    help_text = """
To create a React component, please provide the following details:
1. Component Name
2. Props (list the props)
3. State Management (yes/no)
4. Styling (CSS modules/inline styles/other)
5. Dependencies (list any external libraries)
6. Default Content (structure of the component)
7. Interactions (events the component should handle)

Type 'h' to show this help message again.
Type 'q' to quit.
"""
    print(help_text)


print_help()

while True:
    user_prompt = input('Component Creator: (q to quit, h for help)\n')
    if user_prompt.lower() == 'q':
        print('Goodbye!')
        break
    elif user_prompt.lower() == 'h':
        print_help()
    else:
        list(agent_executor.stream({'input': user_prompt}))
