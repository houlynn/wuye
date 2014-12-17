Ext.define("core.base.resident.model.UnitModel", {
     extend: 'Ext.data.Model',
        fields: [
            {name: 'hasEmail', type: 'bool'},
            {name: 'hasCamera', type: 'bool'},
            {name: 'id', type: 'int'},
            'name',
            {name: 'price', type: 'int'},
            'screen',
            'camera',
            'color',
            'type',
            {name: 'reviews', type: 'int'},
            {name: 'screen-size', type: 'int'}
        ]
    });