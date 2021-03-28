from mergedeep import merge
import json

# predefined rulesets
rulesets = {
    "default": {
        "timelimit": {
            "enabled": False,
            "minutes": 0,
            "seconds": 0,
            "addmove": 0,
            "shared": False,
        },
        "ranked": True,
    }
}

# resolve ruleset from ruleset name or dict
def resolve_ruleset(ruleset):
    # create return variable
    export = {}
    try:
        # try to parse the ruleset as json
        export = json.loads(ruleset)
        merged = dict(rulesets["default"])

        # fill missing keys in dict
        merge(merged, export)
        export = merged
    except ValueError as e:
        # if the ruleset is a name like 'default' or 'columns+2', read it from the predefined rulesets
        if ruleset in rulesets:
            export = rulesets[ruleset]
    if not export:
        export = rulesets["default"]
    return export

