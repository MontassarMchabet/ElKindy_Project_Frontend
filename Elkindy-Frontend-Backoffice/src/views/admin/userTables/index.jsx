import { Box, SimpleGrid } from "@chakra-ui/react";
import AdminTable from "views/admin/userTables/components/AdminTable";
import ClientTable from "views/admin/userTables/components/ClientTable";
import ProfTable from "views/admin/userTables/components/ProfTable";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { adminsData, profsData, clientsData } from "./variables/columnsData";

export default function Settings() {
    const [adminssData, setAdminsData] = useState([]);
    const [clientssData, setClientsData] = useState([]);
    const [profssData, setProfsData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const adminResponse = await axios.get('http://localhost:8080/api/auth/admins');
            setAdminsData(adminResponse.data);
            const clientResponse = await axios.get('http://localhost:8080/api/auth/clients');
            setClientsData(clientResponse.data);
            const profResponse = await axios.get('http://localhost:8080/api/auth/profs');
            setProfsData(profResponse.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [deletingUserId, setDeletingUserId] = useState(null);
    const cancelRef = useRef();

    const confirmDelete = (userId) => {
        setDeletingUserId(userId);
        setIsDeleteDialogOpen(true);
    };

    const cancelDelete = () => {
        setIsDeleteDialogOpen(false);
    };
    const handleDelete = async () => {
        setIsDeleteDialogOpen(false);
        try {
            await axios.delete(`http://localhost:8080/api/auth/deleteUser/${deletingUserId}`);
            console.log("User deleted successfully");
            fetchData();
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    const [isModalOpenA, setIsModalOpenA] = useState(false);
    const [isModalOpenC, setIsModalOpenC] = useState(false);
    const [isModalOpenP, setIsModalOpenP] = useState(false);

    //for admin
    const openModalA = () => {
        setIsModalOpenA(true);
    };
    const closeModalA = () => {
        setIsModalOpenA(false);
    };

    //for client
    const openModalC = () => {
        setIsModalOpenC(true);
    };
    const closeModalC = () => {
        setIsModalOpenC(false);
    };

    //for prof
    const openModalP = () => {
        setIsModalOpenP(true);
    };
    const closeModalP = () => {
        setIsModalOpenP(false);
    };

    return (
        <Box width="3150px" pt={{ base: "130px", md: "80px", xl: "80px" }}>
            <SimpleGrid
                mb='20px'
                columns={{ sm: 1, md: 2 }}
                spacing={{ base: "20px", xl: "20px" }}>
                <AdminTable
                    columnsData={adminsData}
                    tableData={adminssData}
                    handleDelete={handleDelete}
                    cancelDelete={cancelDelete}
                    cancelRef={cancelRef}
                    confirmDelete={confirmDelete}
                    isDeleteDialogOpen={isDeleteDialogOpen}
                    openModalA={openModalA}
                    closeModalA={closeModalA}
                    isModalOpenA={isModalOpenA}
                    fetchData={fetchData}
                />
            </SimpleGrid>

            <SimpleGrid
                mb='20px'
                columns={{ sm: 1, md: 2 }}
                spacing={{ base: "20px", xl: "20px" }}>
                <ProfTable
                    columnsData={profsData}
                    tableData={profssData}
                    handleDelete={handleDelete}
                    cancelDelete={cancelDelete}
                    cancelRef={cancelRef}
                    confirmDelete={confirmDelete}
                    isDeleteDialogOpen={isDeleteDialogOpen}
                    openModalP={openModalP}
                    closeModalP={closeModalP}
                    isModalOpenP={isModalOpenP}
                    fetchData={fetchData}
                />
            </SimpleGrid>

            <SimpleGrid
                mb='20px'
                columns={{ sm: 1, md: 2 }}
                spacing={{ base: "20px", xl: "20px" }}>
                <ClientTable
                    columnsData={clientsData}
                    tableData={clientssData}
                    handleDelete={handleDelete}
                    cancelDelete={cancelDelete}
                    cancelRef={cancelRef}
                    confirmDelete={confirmDelete}
                    isDeleteDialogOpen={isDeleteDialogOpen}
                    openModalC={openModalC}
                    closeModalC={closeModalC}
                    isModalOpenC={isModalOpenC}
                    fetchData={fetchData}
                />
            </SimpleGrid>
        </Box>

    );
}
