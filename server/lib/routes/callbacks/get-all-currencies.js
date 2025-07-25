
export default function getAllCurrencies(request,response,next){
    return response.json({
        currencies:[
            {
                name:"Test",
                slug:"test"
            }
        ]
    })
}