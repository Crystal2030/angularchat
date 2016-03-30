/**
 * Created by crystal on 3/30/16.
 */
angular.module('chatModule').directive('ctrlEnterBreakLine', function(){
    console.log('111111')

    return function(scope, element, attrs){
        var flag = false;
        element.bind('keydown', function(event){
            if(event.which === 17){//ctrl
                flag = true;
                setTimeout(function(){
                    flag = false;
                },1000);
            }
            if(event.which === 13){//enter
                if(flag){
                    element.val(element.val() + '\n');
                }else{
                    scope.$apply(function(){
                        scope.$eval(attrs.ctrlEnterBreakLine);
                    });
                    event.preventDefault();
                }
            }
        })
    }
});