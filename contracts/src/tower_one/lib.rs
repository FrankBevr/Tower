#![cfg_attr(not(feature = "std"), no_std, no_main)]

#[ink::contract]
mod tower {
    use psp34::{
        metadata, Id, PSP34Burnable, PSP34Data, PSP34Error, PSP34Event, PSP34Metadata,
        PSP34Mintable, PSP34,
    };
    use ink::prelude::vec::Vec;

    #[cfg(feature = "enumerable")]
    use crate::PSP34Enumerable;

    #[ink(storage)]
    pub struct Tower {
        data: PSP34Data,          
        metadata: metadata::Data, 
    }

    impl Tower {
        #[ink(constructor)]
        pub fn new() -> Self {
            Self {
                data: PSP34Data::new(),              
                metadata: metadata::Data::default(), 
            }
        }
        fn emit_events(&self, events: ink::prelude::vec::Vec<PSP34Event>) { }
    }

    #[ink(event)]
    pub struct Approval {
        #[ink(topic)]
        owner: AccountId,
        #[ink(topic)]
        operator: AccountId,
        #[ink(topic)]
        id: Option<Id>,
        approved: bool,
    }

    #[ink(event)]
    pub struct Transfer {
        #[ink(topic)]
        from: Option<AccountId>,
        #[ink(topic)]
        to: Option<AccountId>,
        #[ink(topic)]
        id: Id,
    }

    #[ink(event)]
    pub struct AttributeSet {
        id: Id,
        key: Vec<u8>,
        data: Vec<u8>,
    }

    impl PSP34 for Tower {
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
            let events = self.data.transfer(self.env().caller(), to, id, data)?;
            self.emit_events(events);
            Ok(())
        }

        #[ink(message)]
        fn approve(
            &mut self,
            operator: AccountId,
            id: Option<Id>,
            approved: bool,
        ) -> Result<(), PSP34Error> {
            let events = self
                .data
                .approve(self.env().caller(), operator, id, approved)?;
            self.emit_events(events);
            Ok(())
        }

        #[ink(message)]
        fn owner_of(&self, id: Id) -> Option<AccountId> {
            self.data.owner_of(&id)
        }
    }

    impl PSP34Mintable for Tower {
        #[ink(message)]
        fn mint(&mut self, id: Id) -> Result<(), PSP34Error> {
            // Add security, restrict usage of the message
            todo!();
            let events = self.data.mint(self.env().caller(), id)?;
            self.emit_events(events);
            Ok(())
        }
    }

    impl PSP34Burnable for Tower {
        #[ink(message)]
        fn burn(&mut self, account: AccountId, id: Id) -> Result<(), PSP34Error> {
            // Add security, restrict usage of the message
            todo!();
            let events = self.data.burn(self.env().caller(), account, id)?;
            self.emit_events(events);
            Ok(())
        }
    }

    impl PSP34Metadata for Tower {
        #[ink(message)]
        fn get_attribute(&self, id: Id, key: Vec<u8>) -> Option<Vec<u8>> {
            self.metadata.get_attribute(id, key)
        }
    }

    #[cfg(test)]
    mod tests {
        psp34::tests!(Tower, Tower::new);
    }
}
