using System;

namespace CookItNow.Business.Models
{
    public class TextPart : Part
    {
        public override string Type
        {
            get { return "text"; }
        }

        public string Value { get; set; }
    }
}