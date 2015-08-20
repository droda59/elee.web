using System;
using System.Diagnostics;

using MongoDB.Bson.Serialization.Attributes;

namespace CookItNow.Business.Models
{
    [BsonKnownTypes(typeof(ActionPart), typeof(TextPart), typeof(TimerPart), typeof(IngredientPart))]
    [DebuggerDisplay("{DebuggerDisplay}")]
    public abstract class Part
    {
        public abstract string Type { get; }

        internal abstract string DebuggerDisplay { get; }
    }
}