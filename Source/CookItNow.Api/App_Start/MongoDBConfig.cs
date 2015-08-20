using System;

using CookItNow.Business.Models;

using MongoDB.Bson.Serialization;

namespace CookItNow.Api
{
    public static class MongoDBConfig
    {
        public static void RegisterClassMaps()
        {
            BsonClassMap.RegisterClassMap<IngredientEnumerationPart>();
        }
    }
}