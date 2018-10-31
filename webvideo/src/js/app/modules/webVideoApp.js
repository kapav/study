const model = {
    items: [
        { number: 1, purchase: "Хлеб", done: false, price: 15.9 },
        { number: 2, purchase: "Масло", done: false, price: 60 },
        { number: 3, purchase: "Картофель", done: true, price: 22.6 },
        { number: 4, purchase: "Сыр", done: false, price: 310 }
    ]
};
const webVideoApp = angular.module('webVideoApp', []);

webVideoApp.controller('webVideoController', function($scope) {
    $scope.currentRowNumber = 5;
    $scope.list = model;
    $scope.incrementRowNumber = function() {
        return $scope.currentRowNumber++;
    };
    $scope.addItem = function (text, price) {
        price = parseFloat(price); // преобразуем введенное значение к числу
        if(text != "" && !isNaN(price)) { // если текст установлен и введено число, то добавляем
            $scope.list.items.push({
                number: $scope.incrementRowNumber(),
                purchase: text,
                price: price,
                done: false
            });
        } else {}
    };
});

export default webVideoApp;
