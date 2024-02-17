
#![cfg_attr(not(feature = "std"), no_std, no_main)]

#[ink::contract]
mod tower_four {
    use psp34::{
        Id, PSP34Data, PSP34Error, PSP34Mintable, PSP34,
    };

    #[ink(storage)]
    pub struct TowerFour {
        value: bool,
    }

    impl TowerFour {
        #[ink(constructor)]
        pub fn new(init_value: bool) -> Self {
            Self { value: init_value }
        }

        pub fn default() -> Self {
            Self::new(Default::default())
        }

        #[ink(message)]
        pub fn flip(&mut self) {
            self.value = !self.value;
        }

        #[ink(message)]
        pub fn get(&self) -> bool {
            self.value
        }
    }
}
