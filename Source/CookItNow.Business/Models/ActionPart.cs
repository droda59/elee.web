using System;

namespace CookItNow.Business.Models
{
    public class ActionPart : Part
    {
        public override string Type
        {
            get { return "action"; }
        }

        public string Value { get; set; }
    }
}