#![cfg_attr(not(feature = "std"), no_std, no_main)]

mod balances;
mod data;
mod errors;
pub mod metadata;
mod traits;

pub use traits::{PSP34Mintable, PSP34};
pub use errors::PSP34Error;
pub use data::{Id, PSP34Data, PSP34Event};

#[ink::contract]
mod nifty {
      use crate::{
        Id, PSP34Data, PSP34Error, PSP34Event, PSP34Mintable, PSP34
    };
      use crate::metadata;

    /// Defines the storage of your contract.
    /// Add new fields to the below struct in order
    /// to add new static storage fields to your contract.
    #[ink(storage)]
    pub struct Nifty {
        /// Stores a single `bool` value on the storage.
        data: PSP34Data,          // (1)
        metadata: metadata::Data,
    }

    impl Nifty {
        #[ink(constructor)]
        pub fn new() -> Self {
            Self { 
                data: PSP34Data::new(),              // (2)
                metadata: metadata::Data::default(), // (
            }
        }
                fn emit_events(&self, events: ink::prelude::vec::Vec<PSP34Event>) {}
    }


        impl PSP34 for Nifty {
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

    // (6)
    impl PSP34Mintable for Nifty {
        #[ink(message)]
        fn mint(&mut self, id: Id) -> Result<(), PSP34Error> {
            // Add security, restrict usage of the message
            todo!();
            let events = self.data.mint(self.env().caller(), id)?;
            self.emit_events(events);
            Ok(())
        }
    }

    /// Unit tests in Rust are normally defined within such a `#[cfg(test)]`
    /// module and test functions are marked with a `#[test]` attribute.
    /// The below code is technically just normal Rust code.
    #[cfg(test)]
    mod tests {
        /// Imports all the definitions from the outer scope so we can use them here.
        use super::*;

        /// We test if the default constructor does its job.
        #[ink::test]
        fn default_works() {
            let nifty = Nifty::default();
            assert_eq!(nifty.get(), false);
        }

        /// We test a simple use case of our contract.
        #[ink::test]
        fn it_works() {
            let mut nifty = Nifty::new(false);
            assert_eq!(nifty.get(), false);
            nifty.flip();
            assert_eq!(nifty.get(), true);
        }
    }


    /// This is how you'd write end-to-end (E2E) or integration tests for ink! contracts.
    ///
    /// When running these you need to make sure that you:
    /// - Compile the tests with the `e2e-tests` feature flag enabled (`--features e2e-tests`)
    /// - Are running a Substrate node which contains `pallet-contracts` in the background
    #[cfg(all(test, feature = "e2e-tests"))]
    mod e2e_tests {
        /// Imports all the definitions from the outer scope so we can use them here.
        use super::*;

        /// A helper function used for calling contract messages.
        use ink_e2e::build_message;

        /// The End-to-End test `Result` type.
        type E2EResult<T> = std::result::Result<T, Box<dyn std::error::Error>>;

        /// We test that we can upload and instantiate the contract using its default constructor.
        #[ink_e2e::test]
        async fn default_works(mut client: ink_e2e::Client<C, E>) -> E2EResult<()> {
            // Given
            let constructor = NiftyRef::default();

            // When
            let contract_account_id = client
                .instantiate("nifty", &ink_e2e::alice(), constructor, 0, None)
                .await
                .expect("instantiate failed")
                .account_id;

            // Then
            let get = build_message::<NiftyRef>(contract_account_id.clone())
                .call(|nifty| nifty.get());
            let get_result = client.call_dry_run(&ink_e2e::alice(), &get, 0, None).await;
            assert!(matches!(get_result.return_value(), false));

            Ok(())
        }

        /// We test that we can read and write a value from the on-chain contract contract.
        #[ink_e2e::test]
        async fn it_works(mut client: ink_e2e::Client<C, E>) -> E2EResult<()> {
            // Given
            let constructor = NiftyRef::new(false);
            let contract_account_id = client
                .instantiate("nifty", &ink_e2e::bob(), constructor, 0, None)
                .await
                .expect("instantiate failed")
                .account_id;

            let get = build_message::<NiftyRef>(contract_account_id.clone())
                .call(|nifty| nifty.get());
            let get_result = client.call_dry_run(&ink_e2e::bob(), &get, 0, None).await;
            assert!(matches!(get_result.return_value(), false));

            // When
            let flip = build_message::<NiftyRef>(contract_account_id.clone())
                .call(|nifty| nifty.flip());
            let _flip_result = client
                .call(&ink_e2e::bob(), flip, 0, None)
                .await
                .expect("flip failed");

            // Then
            let get = build_message::<NiftyRef>(contract_account_id.clone())
                .call(|nifty| nifty.get());
            let get_result = client.call_dry_run(&ink_e2e::bob(), &get, 0, None).await;
            assert!(matches!(get_result.return_value(), true));

            Ok(())
        }
    }
}
