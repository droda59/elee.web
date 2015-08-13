using System;

using MongoDB.Bson.Serialization.Attributes;

namespace CookItNow.Business.Models
{
    [BsonKnownTypes(typeof(ActionPart), typeof(TextPart), typeof(TimerPart), typeof(IngredientPart))]
    public abstract class Part
    {
        public abstract string Type { get; }
    }
}