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
def create_component_directory():
    """Creates a new directory for the new React component."""
    pass


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

# user prompt
while True:
    user_prompt = input('Component Creator: (q to quit)\n')
    if user_prompt.lower() == 'q':
        print('Goodbye!')
        break
    list(agent_executor.stream({'input': user_prompt}))
