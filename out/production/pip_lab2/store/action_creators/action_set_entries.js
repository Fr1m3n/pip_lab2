import ACTION_SET_ENTRIES from "../actions/action_set_entries";

const createSetEntriesAction = (entries) => ({
    type: ACTION_SET_ENTRIES,
    payload: entries
})

export default createSetEntriesAction;