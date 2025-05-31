# Agent topics

... or component to consider

_Frameworks_ here refers to such frameworks as [Google ADK], [LangChain/Graph],
[Pydantic AI] or [Smollagents].

- Memory
    - Conversational
    - Long term
- Context
  - Authorisations
  - Goal/mission

Remember all memory seen by the LLM, must fit in the context window and
will contribute to the amount of input tokens.

## Conversation memory

For contextual message, like saying "go ahead, do just that". The
LLM needs a history of what went before. This kind of memory is usually
support diretly by framworks.

Conversational memory, is bound to a single session. What delimits a session,
is up the agent implementation. It could be, "until user clicks new conversation" or
after some idle time.

For agent deployment with multiple processor conversation memory must
be in a persistent shared store.

## Long term memory

Long term memory refers to memory of past conversations.

It can be benefical to have an agent remember past conversation.
Such memory should be in a summarised form.

Long term memory must be in persistent store.

[Google ADK]: https://google.github.io/adk-docs/
[LangChain/Graph]: https://python.langchain.com
[Pydantic AI]: https://ai.pydantic.dev
[Smollagents]: https://huggingface.co/docs/smolagents/index