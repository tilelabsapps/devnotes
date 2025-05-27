from ollama import Client
from rich.pretty import pprint

# Create a client instance with the URL of your remote Ollama server
# Note: Replace '198.51.100.1' with your actual server's IP or domain

def main():

  client = Client(host='http://192.168.179.201:11434')


  messages = [{
      'role': 'user',
      'content':  'What is the weather in Vejle?'}
  ]

  try:
      response = client.chat(
          model='llama3.2',
              messages=messages,
      # provide a weather checking tool to the model
              tools=[{
                'type': 'function',
                'function': {
                  'name': 'get_current_weather',
                  'description': 'Get the current weather for a city',
                  'parameters': WeatherRequest.model_json_schema()
                },
              },
            ],
      )
      # Make a request to generate text
      #response = client.generate(
      #    model='nemotron-mini',  # Assuming 'grok' is a model available on your server
      #    prompt='What is the capital of France?',
      #)

      # Print the response
      if response.message.tool_calls:
          for tool_call in response.message.tool_calls:
              name = tool_call.function.name
              args = tool_call.function.arguments
              pprint(tool_call)
              pprint(f"Tool call: {tool_call.function}")
              pprint(f"Tool call name: {name}")
              pprint(f"Tool call argument: {args}")
              if name == 'get_current_weather':
                  w = get_current_wether(WeatherRequest.model_validate(args))
                  pprint(f"Current weather: {w}")
                  messages.append({"role": "tool", "content": w})
      #
      response = client.chat(
          model='llama3.2',
          messages=messages,
      # provide a weather checking tool to the model
              tools=[{
                'type': 'function',
                'function': {
                  'name': 'get_current_weather',
                  'description': 'Get the current weather for a city',
                  'parameters': WeatherRequest.model_json_schema()
                },
              },
            ],
      )

      print(response) #['response'])

  except Exception as e:
      # Handle any errors
      print(f"An error occurred: {e}")

if __name__ == "__main__":
  main()