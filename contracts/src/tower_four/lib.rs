#![cfg_attr(not(feature = "std"), no_std, no_main)]

#[ink::contract]
mod tower_four {
    use psp34::{Id, PSP34Data, PSP34Error, PSP34,PSP34Mintable };

    #[ink(storage)]
    pub struct TowerFour {
        data: PSP34Data,        
        id: u32,
    }

    impl TowerFour {
        #[ink(constructor)]
        pub fn new() -> Self {
            Self { 
                data: PSP34Data::new(), 
                id: 0u32
            }
        }
        pub fn get_id(&self) -> u32 {
            self.id
        }
    }


    impl PSP34 for TowerFour {
        #[ink(message)]
        fn collection_id(&self) -> Id {
            self.data.collection_id(self.env().account_id())
        }

        #[ink(message)]
        fn total_supply(&self) -> u128 {
            self.data.total_supply()
        }

        #[ink(message)]
        fn balance_of(&self, owner: AccountId) -> u32 {
            self.data.balance_of(owner)
        }

        #[ink(message)]
        fn allowance(&self, owner: AccountId, operator: AccountId, id: Option<Id>) -> bool {
            self.data.allowance(owner, operator, id.as_ref())
        }

        #[ink(message)]
        fn transfer(
            &mut self,
            to: AccountId,
            id: Id,
            data: ink::prelude::vec::Vec<u8>,
        ) -> Result<(), PSP34Error> {
            let _ = self.data.transfer(self.env().caller(), to, id, data)?;
            Ok(())
        }

        #[ink(message)]
        fn approve(
            &mut self,
            operator: AccountId,
            id: Option<Id>,
            approved: bool,
        ) -> Result<(), PSP34Error> {
            let _ = self
                .data
                .approve(self.env().caller(), operator, id, approved)?;
            Ok(())
        }

        #[ink(message)]
        fn owner_of(&self, id: Id) -> Option<AccountId> {
            self.data.owner_of(&id)
        }
    }

    impl PSP34Mintable for TowerFour {
        #[ink(message)]
        fn mint(&mut self, id: Id) -> Result<(), PSP34Error> {
             let _ = self.data.mint(self.env().caller(), psp34::Id::U32(self.id))?;
            self.id += 1;
            Ok(())
        }
    }
}
