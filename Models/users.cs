using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace neighborhoodDealer{
    public class users{
        [Key]
        public int userId{get;set;}

        public string email {get;set;}

        public string username {get;set;}

        public string password {get;set;}

    }
}