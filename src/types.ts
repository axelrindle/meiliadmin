interface Action {
    name: string
    description: string
}

export const ApiKeyActions: Action[] = [
    {
        name: 'search',
        description: 'Provides access to both POST and GET search endpoints',
    },
    {
        name: 'documents.add',
        description: 'Provides access to the add documents and update documents endpoints',
    },
    {
        name: 'documents.get',
        description: 'Provides access to the get one document, get documents with POST, and get documents with GET endpoints',
    },
    {
        name: 'documents.delete',
        description: 'Provides access to the delete one document, delete all documents, batch delete, and delete by filter endpoints',
    },
    {
        name: 'indexes.create',
        description: 'Provides access to the create index endpoint',
    },
    {
        name: 'indexes.get',
        description: 'Provides access to the get one index and list all indexes endpoints. Non-authorized indexes will be omitted from the response',
    },
    {
        name: 'indexes.update',
        description: 'Provides access to the update index endpoint',
    },
    {
        name: 'indexes.delete',
        description: 'Provides access to the delete index endpoint',
    },
    {
        name: 'indexes.swap',
        description: 'Provides access to the swap indexes endpoint. Non-authorized indexes will not be swapped',
    },
    {
        name: 'tasks.get',
        description: 'Provides access to the get one task and get tasks endpoints. Tasks from non-authorized indexes will be omitted from the response',
    },
    {
        name: 'tasks.cancel',
        description: 'Provides access to the cancel tasks endpoint. Tasks from non-authorized indexes will not be canceled',
    },
    {
        name: 'tasks.delete',
        description: 'Provides access to the delete tasks endpoint. Tasks from non-authorized indexes will not be deleted',
    },
    {
        name: 'settings.get',
        description: 'Provides access to the get settings endpoint and equivalents for all subroutes',
    },
    {
        name: 'settings.update',
        description: 'Provides access to the update settings and reset settings endpoints and equivalents for all subroutes',
    },
    {
        name: 'stats.get',
        description: 'Provides access to the get stats of an index endpoint and the get stats of all indexes endpoint. For the latter, non-authorized indexes are omitted from the response',
    },
    {
        name: 'dumps.create',
        description: 'Provides access to the create dump endpoint. Not restricted by indexes',
    },
    {
        name: 'snapshots.create',
        description: 'Provides access to the create snapshot endpoint. Not restricted by indexes',
    },
    {
        name: 'version',
        description: 'Provides access to the get Meilisearch version endpoint',
    },
    {
        name: 'keys.get',
        description: 'Provides access to the get all keys endpoint',
    },
    {
        name: 'keys.create',
        description: 'Provides access to the create key endpoint',
    },
    {
        name: 'keys.update',
        description: 'Provides access to the update key endpoint',
    },
    {
        name: 'keys.delete',
        description: 'Provides access to the delete key endpoint',
    },

] as const

export type ApiKeyAction = typeof ApiKeyActions[number]
