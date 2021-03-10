from mergedeep import merge
import json

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

def resolve_ruleset(ruleset):
    export = {}
    try:
        export = json.loads(ruleset)
        merged = dict(rulesets["default"])
        merge(merged, export)
        export = merged
    except ValueError as e:
        if ruleset in rulesets:
            export = rulesets[ruleset]
    if not export:
        export = rulesets["default"]
    return export

