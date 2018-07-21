require.config({
    shim: {
        Flot: {
            deps: ['jquery'],
            exports: '$.plot'
        },
        'Flot-pie': {
            deps: ['Flot']
        },
        'Flot-stack': {
            deps: ['Flot']
        },
        'Flot-selection': {
            deps: ['Flot']
        },
        'Flot-resize': {
            deps: ['Flot']
        },
        'flot.tooltip.pib': {
            deps: ['Flot']
        },
        'Flot-axislabels': {
            deps: ['Flot']
        },
        'Flot-time': {
            deps: ['Flot']
        },

        'jquery-color': {
            deps: ['jquery']
        },

    },
    paths: {
        Flot: 'vendor/Flot/jquery.flot',
        'Flot-pie': 'vendor/Flot/jquery.flot.pie',
        'Flot-stack': 'vendor/Flot/jquery.flot.stack',
        'Flot-time': 'vendor/Flot/jquery.flot.time',
        'Flot-selection': 'vendor/Flot/jquery.flot.selection',
        'Flot-resize': 'vendor/Flot/jquery.flot.resize',
        'backbone.marionette': 'vendor/backbone.marionette/lib/backbone.marionette',
        'backbone.validation': 'vendor/backbone.validation/dist/backbone-validation',
        requirejs: 'vendor/requirejs/require',
        backgrid: 'vendor/backgrid/lib/backgrid',
        'backgrid-paginator': 'vendor/backgrid-paginator/backgrid-paginator',
        'backbone.paginator': 'vendor/backbone.paginator/lib/backbone.paginator',
        backbone: 'vendor/backbone/backbone',
        jquery: 'vendor/jquery/dist/jquery',
        'jquery-color': 'vendor/jquery-color/jquery.color',
        underscore: 'vendor/underscore/underscore',
        'backbone.radio': 'vendor/backbone.radio/build/backbone.radio',
        'flot.tooltip.pib': 'vendor/flot.tooltip.pib/js/jquery.flot.tooltip',
        'backbone.syphon': 'vendor/backbone.syphon/lib/backbone.syphon',
        moment: 'vendor/moment/moment',
    },
})

require(['app'], function(app) {
    'use strict'
    app.start()
})