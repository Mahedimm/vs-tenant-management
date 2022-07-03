import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, PageHeader } from 'antd';
import FlatForm from "./form";
import FlatList from "./list";
import {AiOutlinePlus} from "react-icons/ai";

import {
    addFlat,
    fetchFlats,
    deleteFlat,
    fetchFlat,
    updateFlat,
    resetFlatForm
} from '../../redux/landlord/flats/actionCreator';
function FlatsData() {
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.utilities.loading);
  const flats = useSelector(state => state.lmFlats.flats);
  const flat = useSelector(state => state.lmFlats.flat);
  const [form] = Form.useForm();

  const [state, setState] = useState({ visible: false });

  useEffect(() => {
      const fetchData = async () => {
          await dispatch(fetchFlats({page: 1, perPage: 10}))
      };
      fetchData().then(r => {});
  }, [dispatch]);

  const getFlats = async (page, perPage) => await dispatch(fetchFlats({page, perPage}));
  const flatInfo = (_id) => dispatch(fetchFlat(_id, showModalEdit));

  const showModal = async type => {
      await setState({ ...state, visible: true });
      await dispatch(resetFlatForm());
      await form.resetFields();
  };

  const showModalEdit = async () => {
      await setState({ ...state, visible: true });
      await form.resetFields();
  };

  const handleOk = () => {
      setState({ ...state, visible: false });
  };
  return (
    <div>
       <PageHeader className='border-b-2 border-b-red-400'
        ghost={false}
                title="Flats"
                subTitle={`List of all ${flats.total} flats.`}
                onBack={() => window.history.back()}
       
        extra={[
       
        <Button key="1" type="primary" size="large" 
        onClick={() => showModal('primary')} className="flex"
        >
      
       ADD FLAT
        </Button>
      ]}
  />
    </div>
  )
}

export default FlatsData