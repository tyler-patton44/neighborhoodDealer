using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace neighborhoodDealer{
    public class profile{
        public users user{get;set;}
        public products products{get;set;}
        public reviews reviews{get;set;}
    }
}