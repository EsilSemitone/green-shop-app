import axios from 'axios';
import {
    LoginSchemaRequestDto,
    LoginSchemaResponseDto,
    LogoutResponseDto,
    RegisterSchemaResponseDto,
    RefreshResponseDto,
    ResetPasswordResponseDto,
    ResetPasswordRequestDto,
    RestorePasswordResponseDto,
    GetProductFilterResponseDto,
    GetProductVariantsByCriteriaResponseDto,
    GetProductVariantsByProductResponseDto,
    GetSimilarProductVariantsResponseDto,
    SyncCartResponseDto,
    GetProductVariantByUuidResponseDto,
    CreateCartItemRequestDto,
    CreateCartItemRequestResponseDto,
    UpdateCartItemRequestResponseDto,
    DeleteCartItemRequestParamDto,
    GetAllAddressesResponseDto,
    CreateAddressResponseDto,
    CreateAddressRequestDto,
    DeleteAddressResponseDto,
    UpdateUserRequestDto,
    UpdateUserResponseDto,
    GetMeResponseDto,
    UploadResponseDto,
} from 'contracts';
import { API } from './api-routs';
import { IRegisterForm } from '../components/form/RegisterForm/interfaces/register-form';
import api from './api';
import { ICartItems } from '../store/cart-slice/interfaces/cart-item';

export class ApiService {
    static async register(registerData: IRegisterForm): Promise<RegisterSchemaResponseDto> {
        const { data } = await axios.post<RegisterSchemaResponseDto>(API.auth.register, registerData, {
            withCredentials: true,
        });
        return data;
    }

    static async login(loginData: LoginSchemaRequestDto): Promise<LoginSchemaResponseDto> {
        const { data } = await axios.post<LoginSchemaResponseDto>(API.auth.login, loginData, {
            withCredentials: true,
        });
        return data;
    }

    static async logout(): Promise<LogoutResponseDto> {
        const { data } = await api.post<LogoutResponseDto>(API.auth.logout, {}, { withCredentials: true });
        return data;
    }

    static async refresh(): Promise<RefreshResponseDto> {
        const { data } = await api.post<RefreshResponseDto>(API.auth.refresh, {}, { withCredentials: true });
        return data;
    }

    static async resetPassword(resetData: ResetPasswordRequestDto): Promise<ResetPasswordResponseDto> {
        const { data } = await axios.post<ResetPasswordResponseDto>(API.auth.reset, resetData);
        return data;
    }

    static async restorePassword(email: string): Promise<RestorePasswordResponseDto> {
        const { data } = await axios.post<RestorePasswordResponseDto>(API.auth.restore, {
            email,
        });
        return data;
    }

    static async getProductFilter(): Promise<GetProductFilterResponseDto> {
        const { data } = await api.get<GetProductFilterResponseDto>(API.product.getProductFilter);
        return data;
    }

    static async getProducts(query: string): Promise<GetProductVariantsByCriteriaResponseDto> {
        const { data } = await axios.get<GetProductVariantsByCriteriaResponseDto>(
            `${API.product.getProductVariantsByCriteria}?${query}`,
        );
        return data;
    }

    static async getProductVariantsByProduct(uuid: string): Promise<GetProductVariantsByProductResponseDto> {
        const { data } = await axios.get<GetProductVariantsByProductResponseDto>(API.product.getProductVariantsByProduct(uuid));
        return data;
    }

    static async getSimilarProductVariants(tags_id: string[]): Promise<GetSimilarProductVariantsResponseDto> {
        const { data } = await axios.post<GetSimilarProductVariantsResponseDto>(API.product.getSimilarProductVariants, {
            limit: 8,
            tags_id,
        });
        return data;
    }

    static async syncCart(items: ICartItems): Promise<SyncCartResponseDto> {
        const { data } = await api.post<SyncCartResponseDto>(API.cart.syncCartItems, { items });
        return data;
    }

    static async getProductVariantByUuid(uuid: string): Promise<GetProductVariantByUuidResponseDto> {
        const { data } = await api.get<GetProductVariantByUuidResponseDto>(API.product.getProductVariantByUuid(uuid));
        return data;
    }

    static async updateCartItem(uuid: string, quantity: number): Promise<UpdateCartItemRequestResponseDto> {
        const { data } = await api.patch<UpdateCartItemRequestResponseDto>(API.cart.updateCartItem(uuid), { quantity });
        return data;
    }

    static async deleteCartItem(uuid: string): Promise<DeleteCartItemRequestParamDto> {
        const { data } = await api.delete<DeleteCartItemRequestParamDto>(API.cart.deleteCartItem(uuid));
        return data;
    }

    static async createCartItem(item: CreateCartItemRequestDto): Promise<CreateCartItemRequestResponseDto> {
        const { data } = await api.post<CreateCartItemRequestResponseDto>(API.cart.createCartItem, { ...item });
        return data;
    }

    static async getAddresses(): Promise<GetAllAddressesResponseDto> {
        const { data } = await api.get<GetAllAddressesResponseDto>(API.address.getAll);
        return data;
    }

    static async createAddress(createData: CreateAddressRequestDto): Promise<CreateAddressResponseDto> {
        const { data } = await api.post<CreateAddressResponseDto>(API.address.create, createData);
        return data;
    }

    static async deleteAddress(addressId: string): Promise<DeleteAddressResponseDto> {
        const { data } = await api.delete<DeleteAddressResponseDto>(API.address.delete(addressId));
        return data;
    }

    static async upload(formData: FormData): Promise<UploadResponseDto> {
        const { data } = await api.post<UploadResponseDto>(API.upload.upload, formData);
        return data;
    }

    static async updateUser(updateData: UpdateUserRequestDto): Promise<UpdateUserResponseDto> {
        const { data } = await api.post<UpdateUserResponseDto>(API.user.update, updateData);
        return data;
    }

    static async getProfile(): Promise<GetMeResponseDto> {
        const { data } = await api.get<GetMeResponseDto>(API.user.me);
        return data;
    }
}
