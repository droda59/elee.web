using System;

namespace CookItNow.Business.Models
{
    public class TimerPart : Part
    {
        public override string Type
        {
            get { return "timer"; }
        }

        public string Value { get; set; }

        public string Action { get; set; }
    }
}