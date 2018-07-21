({
    findNestedDependencies: true,	
    baseUrl: '../js',
    dir: '../dist',
    mainConfigFile: '../js/main.js',
    optimize: 'uglify2',
    preserveLicenseComments: false,
    removeCombined: true,
    modules: [
        {
            name: "main",
            exclude: ['json!tables/elements.json', 'json!tables/materials.json', 'json!tables/statuses.json'],
        },
    ]
})