using System;

namespace CookItNow.Business.Models
{
    public class Quantity 
    {
        public double Value { get; set; }
		
        public MeasureUnit OriginalMeasureUnit { get; set; }
    }
}