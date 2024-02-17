#![cfg_attr(not(feature = "std"), no_std, no_main)]

#[ink::contract]
mod tower_three {
    use ink::prelude::string::String;

    #[ink(storage)]
    pub struct TowerThree {
        tower: String,
        owner: AccountId,
    }

    impl TowerThree {
        #[ink(constructor)]
        pub fn new() -> Self {
            Self { 
                tower: String::from("https://ipfs.io/ipfs/02309094891324"), 
                owner: AccountId::from([0xFF;32])
            }
        }

        #[ink(message)]
        pub fn mint(&mut self) {
            if self.owner == AccountId::from([0xFF;32]) {
                self.owner = self.env().caller();
            }
        }

        #[ink(message)]
        pub fn get_owner(&mut self) -> AccountId {
            self.owner
        }

        #[ink(message)]
        pub fn get_tower(&mut self) -> String {
            self.tower.clone()
        }
    }
}
