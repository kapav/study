requirejs.config({
    'baseUrl': 'js/lib',
    'paths': {
        'app': '../app',
        'actions': '../app/actions',
        'jquery': 'https://code.jquery.com/jquery-3.3.1.min',
        'lodash': 'https://cdn.jsdelivr.net/npm/lodash@4.17.10/lodash.min'
    }
});

requirejs(['app/main']);
