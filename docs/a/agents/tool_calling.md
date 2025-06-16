# Tool Calling

Idea was to have a help function that can create the definition.
But models still strugle with creating correct input for
the call to create parameter.

```python
@agent.tool(retries=3)
def define_filter_starts_with(ctx: RunContext[Dependencies], value: str, starts_with: str) -> model.TagManagerFilter:
    """
    Define a filter for checking if a given value start with a given prefix.

    Parameters:
        value (str): The value to check.
          Variables must be enclosed in double curly braces, e.g. `{{Page Path}}`.
        starts_with (str): The prefix that the input should start with.
    Returns:
        Filter: The filter object.
    """
    log = ctx.deps.runlog
    log.tool_start(args=[value, starts_with], label="Define Filter Starts With")
    response = model.TagManagerFilter(
        type='startsWith',
        parameter=[
            model.TagManagerParameter(type='template', key='arg0', value=value),
            model.TagManagerParameter(type='template', key='arg1', value=starts_with),
        ]
    )
    log.tool_end(str(response), label="Define Filter Starts With")
    return response
```

```python
@agent.tool(retries=3)
async def create_trigger(ctx: RunContext[Dependencies],
                         workspace_path: str,
                         name: str,
                         type: Literal["pageview"], # TODO suport more types
                         custom_event_filter=None,
                         auto_event_filter=None,
                         filter: list[model.TagManagerFilter] | None=None,
                         check_validation=None, 
                         wait_for_tags=None, 
                         wait_for_tags_timeout=None, 
                         unique_trigger_id=None, 
                         interval=None, 
                         interval_seconds=None, 
                         limit=None, 
                         max_timer_length_seconds=None, 
                         parameter=None, 
                         parent_folder_id=None, 
                         notes=None) -> model.TagManagerTrigger | model.GoogleErrorContainer:
    """
    Create a trigger in the specified Google Tag Manager workspace.
    
    Parameters:
        workspace_path (str): The path to the workspace where the trigger will be created. 
            workspace_path must be in the format 'accounts/{account_id}/containers/{container_id}/workspaces/{workspace_id}'.
        name: (str): The name of the trigger to be created.
        type (str): The type of the trigger, e.g., 'pageview', 'customEvent', etc. We presently only supports pageview.
        filter (list[TagManagerParameter], optional): A list of parameters representing the filter to be applied to the trigger.
          Filter definition can be complex and must be obtained from one of the define_filter* tools.
        parent_folder_id (str, optional): The ID of the parent folder, if we wish to organise these into folders.
        notes (str, optional): Attach a note to the trigger.

    Returns:
        TagManagerTrigger, GoogleErrorContainer: The created trigger object or an error description.
    """
    # print("Creating trigger", workspace_path, name, type, filter)
    client = ctx.deps.ga4
    log = ctx.deps.runlog
    log.tool_start(args=[workspace_path, name, type, str(filter)], label="Create Trigger")
    response = await client.create_tagmanager_trigger(
        workspace_path=workspace_path,
        trigger=model.TagManagerTrigger(
            name=name,
            type=type,
            filter=filter,
            notes=None
        )
    )
    log.tool_end(str(response), label="Create Trigger")
    return response

```