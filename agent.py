import os
from dotenv import load_dotenv
from langchain_openai import ChatOpenAI
from langchain.agents import AgentExecutor
from langchain.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain.tools import tool
from langsmith import traceable
from langchain_community.tools.shell.tool import ShellTool
from langchain.agents.format_scratchpad.openai_tools import (
    format_to_openai_tool_messages,
)
from langchain.agents.output_parsers.openai_tools import OpenAIToolsAgentOutputParser
import subprocess
from typing import Optional

load_dotenv()


@tool
def create_react_component():
    """Creates a new React component."""
    pass


@tool
def create_component_documentation():
    """Creates documentation for the new React component."""
    pass


@tool
def create_unit_test():
    """Creates unit tests for the new React component."""
    pass


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


# list of the tools
tools = [create_react_component, create_component_documentation, create_unit_test, create_component_directory]

# configure the llm
llm = ChatOpenAI(model='gpt-4o', temperature=0)

# set up prompt template
prompt = ChatPromptTemplate.from_messages(
    [
        (
            "system",
            "You are an expert in React 18 and JavaScript.",
        ),
        ( "user", "{input}" ),
        MessagesPlaceholder(variable_name='agent_scratchpad'),
    ]
)

# bind tools too llm
llm_with_tools = llm.bind_tools(tools)

# agents
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

# executor
agent_executor = AgentExecutor(
    agent=agent,
    tools=tools,
    llm=llm_with_tools,
    verbose=True
)

def print_help():
    help_text = """
To create a React component, please provide the following details:
1. Component Name
2. Component Type (Functional/Class-based)
3. Props (list the props)
4. State Management (yes/no)
5. Styling (CSS modules/inline styles/other)
6. Dependencies (list any external libraries)
7. Default Content (structure of the component)
8. Interactions (events the component should handle)

Type 'h' to show this help message again.
Type 'q' to quit.
"""
    print(help_text)

print_help()


# user prompt
while True:
    user_prompt = input('Component Creator: (h for help,q to quit)\n ')
    if user_prompt.lower() == 'q':
        print('Goodbye!')
        break
    elif user_prompt.lower() == 'h':
        print_help()
    else:
        list(agent_executor.stream({'input': user_prompt}))
