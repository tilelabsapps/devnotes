# Pydantic

## Aliases

May not work as think. Alias take effect when *constructing*, but
not when accessing as fields.

Field Serialiser Aliases take effect on *serialisation*, not on
*deserialisation.

```python
class Obj(BaseModel):
    field_a: str = Field(serialization_alias="fieldA")

Obj(field_a="a")
# > {"fieldA": "A"}

Obj.model_validate_json("{"fieldA": "A"}")
#> Obj[field_a=None]
```

```python
class Obj(BaseModel):
    field_a: str = Field(alias="fieldA")

Obj(fieldA="a")
# > {"fieldA": "A"}

Obj.model_validate_json("{"fieldA": "A"}")
#> Obj[field_a="A"]
```



