using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace neighborhoodDealer{
    public class offers{
        [Key]
        public int offerId{get;set;}

        public int productId{get;set;}
        public products product{get;set;}

        public int userOneId{get;set;}
        public users userOne{get;set;}

        public int userTwoId{get;set;}
        public users userTwo{get;set;}

        public List<messages> messages{get;set;}

        public DateTime createdAt{get;set;}

        public offers(){
            createdAt = DateTime.Now;
        }
    }
}