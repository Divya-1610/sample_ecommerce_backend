embedded doc:
    {
        username:'',
        cart:[
            {
                pname:'',
                price:''
            } ]
    }
    - here changes in cart after declaring in doc will not be reflected
    - can lead to data inconsistency
    reference document:
        {
            username:'',
            cart:[{ref:'product'}]
        }

