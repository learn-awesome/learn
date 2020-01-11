SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: pg_trgm; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pg_trgm WITH SCHEMA public;


--
-- Name: EXTENSION pg_trgm; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION pg_trgm IS 'text similarity measurement and index searching based on trigrams';


--
-- Name: pgcrypto; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public;


--
-- Name: EXTENSION pgcrypto; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';


--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: active_admin_comments; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.active_admin_comments (
    id bigint NOT NULL,
    namespace character varying,
    body text,
    resource_type character varying,
    resource_id bigint,
    author_type character varying,
    author_id bigint,
    created_at timestamp(6) without time zone NOT NULL,
    updated_at timestamp(6) without time zone NOT NULL
);


--
-- Name: active_admin_comments_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.active_admin_comments_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: active_admin_comments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.active_admin_comments_id_seq OWNED BY public.active_admin_comments.id;


--
-- Name: activity_pub_followers; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.activity_pub_followers (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    metadata text NOT NULL,
    created_at timestamp(6) without time zone NOT NULL,
    updated_at timestamp(6) without time zone NOT NULL
);


--
-- Name: admin_users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.admin_users (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    email character varying DEFAULT ''::character varying NOT NULL,
    encrypted_password character varying DEFAULT ''::character varying NOT NULL,
    reset_password_token character varying,
    reset_password_sent_at timestamp without time zone,
    remember_created_at timestamp without time zone,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


--
-- Name: ar_internal_metadata; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.ar_internal_metadata (
    key character varying NOT NULL,
    value character varying,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


--
-- Name: collection_items; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.collection_items (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    collection_id uuid NOT NULL,
    item_id uuid NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


--
-- Name: collections; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.collections (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    name character varying NOT NULL,
    user_id uuid NOT NULL,
    is_public boolean DEFAULT false NOT NULL,
    description text,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


--
-- Name: idea_sets; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.idea_sets (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    name character varying NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    description text
);


--
-- Name: investment_item_versions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.investment_item_versions (
    id bigint NOT NULL,
    item_type character varying NOT NULL,
    item_id integer NOT NULL,
    event character varying NOT NULL,
    whodunnit character varying,
    object json,
    object_changes json,
    created_at timestamp without time zone
);


--
-- Name: investment_item_versions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.investment_item_versions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: investment_item_versions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.investment_item_versions_id_seq OWNED BY public.investment_item_versions.id;


--
-- Name: investment_plan_versions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.investment_plan_versions (
    id bigint NOT NULL,
    item_type character varying NOT NULL,
    item_id integer NOT NULL,
    event character varying NOT NULL,
    whodunnit character varying,
    object json,
    object_changes json,
    created_at timestamp without time zone
);


--
-- Name: investment_plan_versions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.investment_plan_versions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: investment_plan_versions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.investment_plan_versions_id_seq OWNED BY public.investment_plan_versions.id;


--
-- Name: investor_versions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.investor_versions (
    id bigint NOT NULL,
    item_type character varying NOT NULL,
    item_id integer NOT NULL,
    event character varying NOT NULL,
    whodunnit character varying,
    object json,
    object_changes json,
    created_at timestamp without time zone
);


--
-- Name: investor_versions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.investor_versions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: investor_versions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.investor_versions_id_seq OWNED BY public.investor_versions.id;


--
-- Name: item_types; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.item_types (
    id character varying NOT NULL,
    display_name_plural character varying
);


--
-- Name: items; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.items (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    name character varying NOT NULL,
    item_type_id character varying NOT NULL,
    estimated_time integer,
    time_unit character varying DEFAULT 'minutes'::character varying NOT NULL,
    required_expertise integer,
    idea_set_id uuid NOT NULL,
    user_id uuid NOT NULL,
    year integer,
    image_url character varying,
    inspirational_score integer,
    educational_score integer,
    challenging_score integer,
    entertaining_score integer,
    visual_score integer,
    interactive_score integer,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    typical_age_range character varying,
    description text,
    metadata json DEFAULT '"{}"'::json NOT NULL
);


--
-- Name: links; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.links (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    url character varying NOT NULL,
    item_id uuid NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


--
-- Name: people; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.people (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    name character varying NOT NULL,
    description text,
    website character varying,
    email character varying,
    twitter character varying,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    metadata json DEFAULT '"{}"'::json NOT NULL,
    goodreads character varying
);


--
-- Name: person_idea_sets; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.person_idea_sets (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    person_id uuid NOT NULL,
    idea_set_id uuid NOT NULL,
    role character varying,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


--
-- Name: recommendations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.recommendations (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    item_id uuid NOT NULL,
    person_id uuid NOT NULL,
    idea_set_id uuid NOT NULL,
    metadata text,
    created_at timestamp(6) without time zone NOT NULL,
    updated_at timestamp(6) without time zone NOT NULL
);


--
-- Name: reviews; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.reviews (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    item_id uuid NOT NULL,
    status character varying,
    inspirational_score integer,
    educational_score integer,
    challenging_score integer,
    entertaining_score integer,
    visual_score integer,
    interactive_score integer,
    notes text,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    overall_score integer,
    is_posted_on_social_media boolean DEFAULT false
);


--
-- Name: schema_migrations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.schema_migrations (
    version character varying NOT NULL
);


--
-- Name: topic_idea_sets; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.topic_idea_sets (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    topic_id uuid NOT NULL,
    idea_set_id uuid NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    rating integer
);


--
-- Name: topic_relations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.topic_relations (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    from_id uuid NOT NULL,
    to_id uuid NOT NULL,
    kind character varying NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


--
-- Name: topics; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.topics (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    name character varying NOT NULL,
    search_index character varying NOT NULL,
    gitter_room character varying,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    display_name character varying,
    user_id uuid
);


--
-- Name: user_topics; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.user_topics (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    topic_id uuid NOT NULL,
    action character varying NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    value integer,
    by_user_id uuid
);


--
-- Name: user_user_relations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.user_user_relations (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    from_user_id uuid NOT NULL,
    to_user_id uuid NOT NULL,
    action character varying DEFAULT 'follow'::character varying NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


--
-- Name: user_vouchers; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.user_vouchers (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    user_id bigint NOT NULL,
    voucher_id bigint NOT NULL,
    status character varying NOT NULL,
    expires_at date,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    nickname character varying NOT NULL,
    auth0_uid character varying NOT NULL,
    authinfo text NOT NULL,
    image_url character varying,
    bio character varying,
    description text,
    score integer DEFAULT 100 NOT NULL,
    role character varying DEFAULT 'regular'::character varying NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    random_fav_topic boolean DEFAULT false NOT NULL,
    random_fav_item_types character varying,
    referrer character varying,
    post_reviews_to_twitter boolean DEFAULT false NOT NULL,
    unsubscribe boolean DEFAULT false NOT NULL
);


--
-- Name: versions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.versions (
    id bigint NOT NULL,
    item_type character varying NOT NULL,
    item_id integer NOT NULL,
    event character varying NOT NULL,
    whodunnit character varying,
    object text,
    created_at timestamp without time zone
);


--
-- Name: versions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.versions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: versions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.versions_id_seq OWNED BY public.versions.id;


--
-- Name: vouchers; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.vouchers (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    user_id bigint NOT NULL,
    code character varying NOT NULL,
    max_limit integer,
    payment_ref character varying,
    domain character varying,
    price integer,
    period_days integer,
    internal_description character varying,
    status character varying NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


--
-- Name: wms_activities; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.wms_activities (
    id bigint NOT NULL,
    activity_type integer DEFAULT 0,
    status character varying,
    investment_id bigint,
    current_gp_id bigint,
    edited_gp_id bigint,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    activity_amount numeric,
    other_fields json,
    investment_request_id integer
);


--
-- Name: wms_activities_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.wms_activities_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: wms_activities_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.wms_activities_id_seq OWNED BY public.wms_activities.id;


--
-- Name: wms_addresses; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.wms_addresses (
    id bigint NOT NULL,
    type character varying,
    address_line1 character varying,
    address_line2 character varying,
    city character varying,
    state character varying,
    country character varying,
    pincode integer,
    investor_id uuid,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    deleted_at timestamp without time zone
);


--
-- Name: wms_addresses_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.wms_addresses_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: wms_addresses_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.wms_addresses_id_seq OWNED BY public.wms_addresses.id;


--
-- Name: wms_answers; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.wms_answers (
    id bigint NOT NULL,
    question_id bigint,
    answer_text character varying,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    investor_id uuid,
    questionary_id integer,
    additional_text character varying,
    question_section_id integer
);


--
-- Name: wms_answers_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.wms_answers_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: wms_answers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.wms_answers_id_seq OWNED BY public.wms_answers.id;


--
-- Name: wms_app_settings; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.wms_app_settings (
    id bigint NOT NULL,
    key character varying,
    value character varying
);


--
-- Name: wms_app_settings_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.wms_app_settings_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: wms_app_settings_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.wms_app_settings_id_seq OWNED BY public.wms_app_settings.id;


--
-- Name: wms_apps; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.wms_apps (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying NOT NULL,
    risk_profile_type character varying DEFAULT 'WI'::character varying,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    validate_risk boolean DEFAULT false,
    risk_taking_ability integer
);


--
-- Name: wms_cash_accounts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.wms_cash_accounts (
    id bigint NOT NULL,
    cash_account_type character varying,
    account_id character varying,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


--
-- Name: wms_cash_accounts_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.wms_cash_accounts_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: wms_cash_accounts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.wms_cash_accounts_id_seq OWNED BY public.wms_cash_accounts.id;


--
-- Name: wms_cash_transfer_requests; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.wms_cash_transfer_requests (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    request_type integer,
    request_mode integer,
    requested_at timestamp without time zone,
    destination_id bigint,
    source_id bigint,
    investment_request_id bigint,
    requested_amount numeric,
    received_amount numeric,
    status character varying,
    received_at timestamp without time zone,
    received_currency_id bigint,
    requested_currency_id bigint,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    deleted_at timestamp without time zone
);


--
-- Name: wms_channels; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.wms_channels (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    investor_mode character varying,
    ipolc_type integer,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    name character varying,
    enable_prospect_without_authentication boolean,
    archive_unfund_date integer,
    archive_unfund_notify_date integer,
    continous_failure_count_limit integer,
    health_status_limit integer,
    skipped_month_count integer,
    extend_months integer,
    notify_x_days integer
);


--
-- Name: wms_currencies; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.wms_currencies (
    id bigint NOT NULL,
    name character varying,
    symbol character varying,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


--
-- Name: wms_currencies_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.wms_currencies_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: wms_currencies_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.wms_currencies_id_seq OWNED BY public.wms_currencies.id;


--
-- Name: wms_expected_outcomes; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.wms_expected_outcomes (
    id bigint NOT NULL,
    outcome json,
    investment_plan_id bigint,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    return_amount double precision,
    return_ccy character varying,
    annualised_return double precision,
    annualised_volatility double precision,
    proposal_id uuid,
    success_probability double precision
);


--
-- Name: wms_expected_outcomes_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.wms_expected_outcomes_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: wms_expected_outcomes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.wms_expected_outcomes_id_seq OWNED BY public.wms_expected_outcomes.id;


--
-- Name: wms_expenses; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.wms_expenses (
    id bigint NOT NULL,
    planned_country character varying,
    planned_city_tier integer,
    life_style integer,
    expense json,
    inflation_rate json,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    post_ret_inflation_rate json,
    type character varying,
    area_type integer,
    university_tier integer,
    degree integer,
    degree_duration integer,
    city character varying,
    home_dimension character varying
);


--
-- Name: wms_expenses_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.wms_expenses_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: wms_expenses_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.wms_expenses_id_seq OWNED BY public.wms_expenses.id;


--
-- Name: wms_goal_types; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.wms_goal_types (
    id bigint NOT NULL,
    name character varying,
    identifier character varying,
    description character varying,
    show_order integer,
    image_url character varying,
    estimated_goal_amount_formula character varying,
    investment_period_formula character varying,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    goal_plan_type character varying,
    default_timeline integer,
    outcome_percentile double precision DEFAULT 50.0,
    channel_id uuid,
    min_initial_investment_amount integer,
    max_initial_investment_amount integer,
    min_additional_investment_amount integer,
    max_additional_investment_amount integer,
    min_monthly_investment_amount integer,
    max_monthly_investment_amount integer,
    min_debit_date_monthly_investment integer,
    max_debit_date_monthly_investment integer,
    min_withdrawal_amount integer,
    max_withdrawal_amount integer,
    min_goal_timeline integer,
    max_goal_timeline integer,
    min_target_amount integer,
    max_target_amount integer,
    reco_mode character varying,
    optimisation_suggestion_mode integer,
    min_reco_probability_threshold integer,
    max_reco_probability_threshold integer,
    no_of_reco_strategies integer,
    mcs_percentiles integer[],
    risk_constraint_mode integer,
    reco_probability_thresholds double precision[],
    min_suggestion_threshold double precision,
    max_suggestion_threshold double precision,
    health_track_threshold double precision DEFAULT 30.0,
    lower_tolerance double precision,
    upper_tolerance double precision,
    min_current_age integer,
    max_current_age integer,
    min_retirement_age integer,
    max_retirement_age integer,
    min_life_expectancy integer,
    max_life_expectancy integer,
    expense_types text[] DEFAULT '{}'::text[],
    conservative_inv_rate numeric DEFAULT 0.0,
    multi_strategy_mode integer DEFAULT 1,
    suggestion_types character varying[] DEFAULT '{}'::character varying[],
    post_investment_multi_strategy_mode integer DEFAULT 1,
    post_investment_suggestion_types character varying[] DEFAULT '{}'::character varying[],
    min_age_attending_university integer,
    max_age_attending_university integer
);


--
-- Name: wms_goal_types_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.wms_goal_types_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: wms_goal_types_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.wms_goal_types_id_seq OWNED BY public.wms_goal_types.id;


--
-- Name: wms_investment_items; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.wms_investment_items (
    id bigint NOT NULL,
    proposal_id uuid,
    instrument_id character varying,
    instrument_name character varying,
    instrument_allocation_percentage numeric,
    instrument_allocation_amount numeric,
    instrument_allocation_units numeric,
    instrument_price numeric,
    instrument_order_type integer,
    investment_item_status character varying,
    investment_request_id bigint,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    investment_id bigint,
    execution_venue character varying,
    recurring_investment_id bigint,
    investment_type character varying,
    product_code character varying,
    switch_pair_id integer
);


--
-- Name: wms_investment_items_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.wms_investment_items_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: wms_investment_items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.wms_investment_items_id_seq OWNED BY public.wms_investment_items.id;


--
-- Name: wms_investment_plans; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.wms_investment_plans (
    id bigint NOT NULL,
    name character varying,
    type character varying,
    initial_investment_amount numeric,
    monthly_investment_amount numeric,
    timeline integer,
    target_amount numeric,
    status character varying,
    reco_mode integer,
    risk_profile integer,
    goal_type_id bigint,
    currency_id bigint,
    investor_id uuid,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    deleted_at timestamp without time zone,
    investment_id bigint,
    strategy_id integer,
    strategy_version_id integer,
    additional_investment_amount numeric,
    withdrawal_amount numeric,
    current_age integer,
    distribution_timeline integer,
    retirement_age integer,
    life_expectancy_age integer,
    expense_id integer,
    expenses json,
    retirement_lum_sum_amount numeric,
    retirement_monthly_income numeric,
    continue_investment_post_retirement boolean DEFAULT false,
    future_monthly_expense numeric,
    university_joining_age integer,
    recurring_investment_details json
);


--
-- Name: wms_investment_plans_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.wms_investment_plans_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: wms_investment_plans_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.wms_investment_plans_id_seq OWNED BY public.wms_investment_plans.id;


--
-- Name: wms_investment_requests; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.wms_investment_requests (
    id bigint NOT NULL,
    investment_amount numeric,
    status character varying,
    order_request_id character varying,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    investment_id bigint,
    proposal_id uuid,
    type character varying,
    recurring_investment_date timestamp without time zone,
    recurring_investment_id bigint
);


--
-- Name: wms_investment_requests_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.wms_investment_requests_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: wms_investment_requests_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.wms_investment_requests_id_seq OWNED BY public.wms_investment_requests.id;


--
-- Name: wms_investments; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.wms_investments (
    id bigint NOT NULL,
    display_name character varying,
    investment_type character varying,
    status character varying,
    investment_plan_id bigint,
    investor_id uuid,
    currency_id bigint,
    investment_health_status integer,
    investment_lifecycle_status integer,
    investment_cvl numeric,
    strategy_id character varying,
    wi_instrument_id character varying,
    client_fund_account_number character varying,
    dca_date integer,
    type character varying,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    deleted_at timestamp without time zone,
    proposal_id uuid,
    investment_wrapper_id character varying,
    invested_since timestamp without time zone,
    image_url character varying,
    active_since timestamp without time zone,
    completes_on timestamp without time zone,
    last_rebalance_date date,
    last_activity_date timestamp without time zone
);


--
-- Name: wms_investments_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.wms_investments_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: wms_investments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.wms_investments_id_seq OWNED BY public.wms_investments.id;


--
-- Name: wms_investor_accounts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.wms_investor_accounts (
    id bigint NOT NULL,
    account_type integer,
    name_of_account_holder character varying,
    account_number character varying,
    investor_id uuid,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    deleted_at timestamp without time zone,
    bank_name character varying,
    other_bank_name character varying,
    fi_cutomer_id character varying,
    system_generated boolean
);


--
-- Name: wms_investor_accounts_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.wms_investor_accounts_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: wms_investor_accounts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.wms_investor_accounts_id_seq OWNED BY public.wms_investor_accounts.id;


--
-- Name: wms_investors; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.wms_investors (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    type character varying,
    investor_reference_id character varying,
    crs numeric,
    crr integer,
    status character varying,
    risk_profiling_date date,
    risk_profiling_status character varying,
    onboarding_channel integer,
    client_segment integer,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    deleted_at timestamp without time zone,
    first_name character varying,
    last_name character varying,
    middle_name character varying,
    nick_name character varying,
    email character varying,
    mobile_number character varying,
    investor_type integer DEFAULT 0,
    corporate_id character varying,
    citizenship character varying,
    nationality character varying,
    dob date,
    gender integer,
    marital_status integer,
    home_phone character varying,
    residential_status integer,
    country_of_tax_residence character varying,
    tin character varying,
    second_tax_residence character varying,
    second_tin character varying,
    occupation_status integer,
    gross_annual_income numeric,
    company_name character varying,
    designation character varying,
    length_of_employment integer,
    investment_source character varying,
    us_person boolean,
    liquid_cash_amount numeric,
    deposits_available numeric,
    liabilities_per_month numeric,
    kyc_status character varying,
    salutation integer,
    risk_expiry_date date,
    non_liquid_investments numeric,
    total_liabilities numeric,
    investor_wrapper_id character varying,
    bankaccount_verification_status integer,
    secondary_channel integer,
    rm_status integer DEFAULT 0,
    company_phone_number character varying,
    primary_id_type character varying,
    primary_id_number character varying,
    country_of_issue character varying,
    date_of_issue date,
    date_of_expiry date,
    secondary_id_type character varying,
    secondary_id_number character varying,
    fund_other character varying,
    name_of_account_holder character varying,
    bank_name character varying,
    account_number character varying,
    secondary_email character varying,
    password character varying,
    primary_channel character varying,
    cash_wrapper_id character varying,
    age integer,
    status_trail text[] DEFAULT '{}'::text[],
    last_activity_date timestamp without time zone,
    last_risk_profiling_status_timestamp timestamp without time zone,
    assessed_crr integer,
    otp_secret_key character varying
);


--
-- Name: wms_kycs; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.wms_kycs (
    id bigint NOT NULL,
    status character varying,
    id_type character varying,
    id_number character varying,
    country_of_issue character varying,
    date_of_issue date,
    date_of_expiry date,
    investor_id uuid,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    deleted_at timestamp without time zone
);


--
-- Name: wms_kycs_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.wms_kycs_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: wms_kycs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.wms_kycs_id_seq OWNED BY public.wms_kycs.id;


--
-- Name: wms_proposals; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.wms_proposals (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    ipolc_type integer,
    investment_plan_id bigint,
    proposal_details json,
    proposal_status character varying,
    proposal_investment_amount numeric,
    recommended_strategy_id integer,
    recommended_strategy_version_id integer,
    chosen_strategy_id integer,
    chosen_strategy_version_id integer,
    proposal_timestamp timestamp without time zone,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    investment_id bigint,
    investment_request_type integer,
    accepted_at timestamp without time zone,
    risk_accept_flag boolean DEFAULT false
);


--
-- Name: wms_question_options; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.wms_question_options (
    id bigint NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    question_id integer,
    label character varying,
    weightage double precision DEFAULT 0.0 NOT NULL,
    "order" integer DEFAULT 0 NOT NULL,
    score double precision DEFAULT 0.0 NOT NULL,
    additional_info jsonb DEFAULT '{}'::jsonb,
    range numrange
);


--
-- Name: wms_question_options_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.wms_question_options_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: wms_question_options_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.wms_question_options_id_seq OWNED BY public.wms_question_options.id;


--
-- Name: wms_question_sections; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.wms_question_sections (
    id bigint NOT NULL,
    question_count integer DEFAULT 0 NOT NULL,
    name character varying,
    weightage double precision DEFAULT 0.0 NOT NULL,
    "order" integer DEFAULT 0 NOT NULL,
    questionary_id bigint,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    compute boolean DEFAULT false
);


--
-- Name: wms_question_sections_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.wms_question_sections_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: wms_question_sections_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.wms_question_sections_id_seq OWNED BY public.wms_question_sections.id;


--
-- Name: wms_questionaries; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.wms_questionaries (
    id bigint NOT NULL,
    name character varying,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    channel_id uuid,
    calculation integer DEFAULT 0
);


--
-- Name: wms_questionaries_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.wms_questionaries_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: wms_questionaries_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.wms_questionaries_id_seq OWNED BY public.wms_questionaries.id;


--
-- Name: wms_questions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.wms_questions (
    id bigint NOT NULL,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    question_section_id integer,
    description character varying,
    header character varying,
    weightage double precision DEFAULT 0.0 NOT NULL,
    "order" integer DEFAULT 0 NOT NULL,
    option_type integer DEFAULT 0,
    response_type integer DEFAULT 0,
    with_text boolean DEFAULT false,
    text_label character varying
);


--
-- Name: wms_questions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.wms_questions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: wms_questions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.wms_questions_id_seq OWNED BY public.wms_questions.id;


--
-- Name: wms_recurring_investments; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.wms_recurring_investments (
    id bigint NOT NULL,
    status character varying,
    debit_date integer,
    frequency integer,
    total_count integer,
    remaining_count integer,
    completed_count integer,
    failure_count integer,
    success_count integer,
    last_debit_date date,
    last_successful_order_date date,
    recurring_amount numeric,
    start_date date,
    end_date date,
    deleted_at timestamp without time zone,
    investment_id bigint,
    currency_id bigint,
    investment_plan_id bigint,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    last_recurring_amount numeric,
    continuous_failure_count integer,
    upcoming_day integer
);


--
-- Name: wms_recurring_investments_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.wms_recurring_investments_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: wms_recurring_investments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.wms_recurring_investments_id_seq OWNED BY public.wms_recurring_investments.id;


--
-- Name: wms_risk_profiles; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.wms_risk_profiles (
    id bigint NOT NULL,
    name character varying,
    multi_range boolean DEFAULT false,
    channel_id uuid,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL,
    section_id integer,
    associate_section_id integer,
    rank integer,
    range numrange,
    associate_range numrange
);


--
-- Name: wms_risk_profiles_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.wms_risk_profiles_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: wms_risk_profiles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.wms_risk_profiles_id_seq OWNED BY public.wms_risk_profiles.id;


--
-- Name: wms_suggestions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.wms_suggestions (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    investment_plan_id bigint,
    suggestion_type integer,
    suggestion_value integer,
    strategy_id bigint,
    version_id bigint,
    status character varying,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);


--
-- Name: active_admin_comments id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.active_admin_comments ALTER COLUMN id SET DEFAULT nextval('public.active_admin_comments_id_seq'::regclass);


--
-- Name: investment_item_versions id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.investment_item_versions ALTER COLUMN id SET DEFAULT nextval('public.investment_item_versions_id_seq'::regclass);


--
-- Name: investment_plan_versions id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.investment_plan_versions ALTER COLUMN id SET DEFAULT nextval('public.investment_plan_versions_id_seq'::regclass);


--
-- Name: investor_versions id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.investor_versions ALTER COLUMN id SET DEFAULT nextval('public.investor_versions_id_seq'::regclass);


--
-- Name: versions id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.versions ALTER COLUMN id SET DEFAULT nextval('public.versions_id_seq'::regclass);


--
-- Name: wms_activities id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.wms_activities ALTER COLUMN id SET DEFAULT nextval('public.wms_activities_id_seq'::regclass);


--
-- Name: wms_addresses id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.wms_addresses ALTER COLUMN id SET DEFAULT nextval('public.wms_addresses_id_seq'::regclass);


--
-- Name: wms_answers id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.wms_answers ALTER COLUMN id SET DEFAULT nextval('public.wms_answers_id_seq'::regclass);


--
-- Name: wms_app_settings id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.wms_app_settings ALTER COLUMN id SET DEFAULT nextval('public.wms_app_settings_id_seq'::regclass);


--
-- Name: wms_cash_accounts id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.wms_cash_accounts ALTER COLUMN id SET DEFAULT nextval('public.wms_cash_accounts_id_seq'::regclass);


--
-- Name: wms_currencies id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.wms_currencies ALTER COLUMN id SET DEFAULT nextval('public.wms_currencies_id_seq'::regclass);


--
-- Name: wms_expected_outcomes id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.wms_expected_outcomes ALTER COLUMN id SET DEFAULT nextval('public.wms_expected_outcomes_id_seq'::regclass);


--
-- Name: wms_expenses id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.wms_expenses ALTER COLUMN id SET DEFAULT nextval('public.wms_expenses_id_seq'::regclass);


--
-- Name: wms_goal_types id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.wms_goal_types ALTER COLUMN id SET DEFAULT nextval('public.wms_goal_types_id_seq'::regclass);


--
-- Name: wms_investment_items id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.wms_investment_items ALTER COLUMN id SET DEFAULT nextval('public.wms_investment_items_id_seq'::regclass);


--
-- Name: wms_investment_plans id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.wms_investment_plans ALTER COLUMN id SET DEFAULT nextval('public.wms_investment_plans_id_seq'::regclass);


--
-- Name: wms_investment_requests id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.wms_investment_requests ALTER COLUMN id SET DEFAULT nextval('public.wms_investment_requests_id_seq'::regclass);


--
-- Name: wms_investments id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.wms_investments ALTER COLUMN id SET DEFAULT nextval('public.wms_investments_id_seq'::regclass);


--
-- Name: wms_investor_accounts id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.wms_investor_accounts ALTER COLUMN id SET DEFAULT nextval('public.wms_investor_accounts_id_seq'::regclass);


--
-- Name: wms_kycs id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.wms_kycs ALTER COLUMN id SET DEFAULT nextval('public.wms_kycs_id_seq'::regclass);


--
-- Name: wms_question_options id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.wms_question_options ALTER COLUMN id SET DEFAULT nextval('public.wms_question_options_id_seq'::regclass);


--
-- Name: wms_question_sections id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.wms_question_sections ALTER COLUMN id SET DEFAULT nextval('public.wms_question_sections_id_seq'::regclass);


--
-- Name: wms_questionaries id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.wms_questionaries ALTER COLUMN id SET DEFAULT nextval('public.wms_questionaries_id_seq'::regclass);


--
-- Name: wms_questions id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.wms_questions ALTER COLUMN id SET DEFAULT nextval('public.wms_questions_id_seq'::regclass);


--
-- Name: wms_recurring_investments id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.wms_recurring_investments ALTER COLUMN id SET DEFAULT nextval('public.wms_recurring_investments_id_seq'::regclass);


--
-- Name: wms_risk_profiles id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.wms_risk_profiles ALTER COLUMN id SET DEFAULT nextval('public.wms_risk_profiles_id_seq'::regclass);


--
-- Name: active_admin_comments active_admin_comments_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.active_admin_comments
    ADD CONSTRAINT active_admin_comments_pkey PRIMARY KEY (id);


--
-- Name: activity_pub_followers activity_pub_followers_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.activity_pub_followers
    ADD CONSTRAINT activity_pub_followers_pkey PRIMARY KEY (id);


--
-- Name: admin_users admin_users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.admin_users
    ADD CONSTRAINT admin_users_pkey PRIMARY KEY (id);


--
-- Name: ar_internal_metadata ar_internal_metadata_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.ar_internal_metadata
    ADD CONSTRAINT ar_internal_metadata_pkey PRIMARY KEY (key);


--
-- Name: collection_items collection_items_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.collection_items
    ADD CONSTRAINT collection_items_pkey PRIMARY KEY (id);


--
-- Name: collections collections_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.collections
    ADD CONSTRAINT collections_pkey PRIMARY KEY (id);


--
-- Name: idea_sets idea_sets_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.idea_sets
    ADD CONSTRAINT idea_sets_pkey PRIMARY KEY (id);


--
-- Name: investment_item_versions investment_item_versions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.investment_item_versions
    ADD CONSTRAINT investment_item_versions_pkey PRIMARY KEY (id);


--
-- Name: investment_plan_versions investment_plan_versions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.investment_plan_versions
    ADD CONSTRAINT investment_plan_versions_pkey PRIMARY KEY (id);


--
-- Name: investor_versions investor_versions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.investor_versions
    ADD CONSTRAINT investor_versions_pkey PRIMARY KEY (id);


--
-- Name: item_types item_types_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.item_types
    ADD CONSTRAINT item_types_pkey PRIMARY KEY (id);


--
-- Name: items items_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.items
    ADD CONSTRAINT items_pkey PRIMARY KEY (id);


--
-- Name: links links_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.links
    ADD CONSTRAINT links_pkey PRIMARY KEY (id);


--
-- Name: people people_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.people
    ADD CONSTRAINT people_pkey PRIMARY KEY (id);


--
-- Name: person_idea_sets person_idea_sets_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.person_idea_sets
    ADD CONSTRAINT person_idea_sets_pkey PRIMARY KEY (id);


--
-- Name: recommendations recommendations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.recommendations
    ADD CONSTRAINT recommendations_pkey PRIMARY KEY (id);


--
-- Name: reviews reviews_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_pkey PRIMARY KEY (id);


--
-- Name: schema_migrations schema_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.schema_migrations
    ADD CONSTRAINT schema_migrations_pkey PRIMARY KEY (version);


--
-- Name: topic_idea_sets topic_idea_sets_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.topic_idea_sets
    ADD CONSTRAINT topic_idea_sets_pkey PRIMARY KEY (id);


--
-- Name: topic_relations topic_relations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.topic_relations
    ADD CONSTRAINT topic_relations_pkey PRIMARY KEY (id);


--
-- Name: topics topics_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.topics
    ADD CONSTRAINT topics_pkey PRIMARY KEY (id);


--
-- Name: user_topics user_topics_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_topics
    ADD CONSTRAINT user_topics_pkey PRIMARY KEY (id);


--
-- Name: user_user_relations user_user_relations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_user_relations
    ADD CONSTRAINT user_user_relations_pkey PRIMARY KEY (id);


--
-- Name: user_vouchers user_vouchers_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_vouchers
    ADD CONSTRAINT user_vouchers_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: versions versions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.versions
    ADD CONSTRAINT versions_pkey PRIMARY KEY (id);


--
-- Name: vouchers vouchers_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.vouchers
    ADD CONSTRAINT vouchers_pkey PRIMARY KEY (id);


--
-- Name: wms_activities wms_activities_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.wms_activities
    ADD CONSTRAINT wms_activities_pkey PRIMARY KEY (id);


--
-- Name: wms_addresses wms_addresses_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.wms_addresses
    ADD CONSTRAINT wms_addresses_pkey PRIMARY KEY (id);


--
-- Name: wms_answers wms_answers_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.wms_answers
    ADD CONSTRAINT wms_answers_pkey PRIMARY KEY (id);


--
-- Name: wms_app_settings wms_app_settings_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.wms_app_settings
    ADD CONSTRAINT wms_app_settings_pkey PRIMARY KEY (id);


--
-- Name: wms_apps wms_apps_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.wms_apps
    ADD CONSTRAINT wms_apps_pkey PRIMARY KEY (id);


--
-- Name: wms_cash_accounts wms_cash_accounts_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.wms_cash_accounts
    ADD CONSTRAINT wms_cash_accounts_pkey PRIMARY KEY (id);


--
-- Name: wms_cash_transfer_requests wms_cash_transfer_requests_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.wms_cash_transfer_requests
    ADD CONSTRAINT wms_cash_transfer_requests_pkey PRIMARY KEY (id);


--
-- Name: wms_channels wms_channels_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.wms_channels
    ADD CONSTRAINT wms_channels_pkey PRIMARY KEY (id);


--
-- Name: wms_currencies wms_currencies_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.wms_currencies
    ADD CONSTRAINT wms_currencies_pkey PRIMARY KEY (id);


--
-- Name: wms_expected_outcomes wms_expected_outcomes_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.wms_expected_outcomes
    ADD CONSTRAINT wms_expected_outcomes_pkey PRIMARY KEY (id);


--
-- Name: wms_expenses wms_expenses_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.wms_expenses
    ADD CONSTRAINT wms_expenses_pkey PRIMARY KEY (id);


--
-- Name: wms_goal_types wms_goal_types_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.wms_goal_types
    ADD CONSTRAINT wms_goal_types_pkey PRIMARY KEY (id);


--
-- Name: wms_investment_items wms_investment_items_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.wms_investment_items
    ADD CONSTRAINT wms_investment_items_pkey PRIMARY KEY (id);


--
-- Name: wms_investment_plans wms_investment_plans_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.wms_investment_plans
    ADD CONSTRAINT wms_investment_plans_pkey PRIMARY KEY (id);


--
-- Name: wms_investment_requests wms_investment_requests_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.wms_investment_requests
    ADD CONSTRAINT wms_investment_requests_pkey PRIMARY KEY (id);


--
-- Name: wms_investments wms_investments_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.wms_investments
    ADD CONSTRAINT wms_investments_pkey PRIMARY KEY (id);


--
-- Name: wms_investor_accounts wms_investor_accounts_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.wms_investor_accounts
    ADD CONSTRAINT wms_investor_accounts_pkey PRIMARY KEY (id);


--
-- Name: wms_investors wms_investors_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.wms_investors
    ADD CONSTRAINT wms_investors_pkey PRIMARY KEY (id);


--
-- Name: wms_kycs wms_kycs_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.wms_kycs
    ADD CONSTRAINT wms_kycs_pkey PRIMARY KEY (id);


--
-- Name: wms_proposals wms_proposals_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.wms_proposals
    ADD CONSTRAINT wms_proposals_pkey PRIMARY KEY (id);


--
-- Name: wms_question_options wms_question_options_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.wms_question_options
    ADD CONSTRAINT wms_question_options_pkey PRIMARY KEY (id);


--
-- Name: wms_question_sections wms_question_sections_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.wms_question_sections
    ADD CONSTRAINT wms_question_sections_pkey PRIMARY KEY (id);


--
-- Name: wms_questionaries wms_questionaries_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.wms_questionaries
    ADD CONSTRAINT wms_questionaries_pkey PRIMARY KEY (id);


--
-- Name: wms_questions wms_questions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.wms_questions
    ADD CONSTRAINT wms_questions_pkey PRIMARY KEY (id);


--
-- Name: wms_recurring_investments wms_recurring_investments_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.wms_recurring_investments
    ADD CONSTRAINT wms_recurring_investments_pkey PRIMARY KEY (id);


--
-- Name: wms_risk_profiles wms_risk_profiles_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.wms_risk_profiles
    ADD CONSTRAINT wms_risk_profiles_pkey PRIMARY KEY (id);


--
-- Name: wms_suggestions wms_suggestions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.wms_suggestions
    ADD CONSTRAINT wms_suggestions_pkey PRIMARY KEY (id);


--
-- Name: index_active_admin_comments_on_author_type_and_author_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_active_admin_comments_on_author_type_and_author_id ON public.active_admin_comments USING btree (author_type, author_id);


--
-- Name: index_active_admin_comments_on_namespace; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_active_admin_comments_on_namespace ON public.active_admin_comments USING btree (namespace);


--
-- Name: index_active_admin_comments_on_resource_type_and_resource_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_active_admin_comments_on_resource_type_and_resource_id ON public.active_admin_comments USING btree (resource_type, resource_id);


--
-- Name: index_activities_on_goal_completion; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_activities_on_goal_completion ON public.wms_activities USING btree (activity_type, current_gp_id, status);


--
-- Name: index_activity_pub_followers_on_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_activity_pub_followers_on_user_id ON public.activity_pub_followers USING btree (user_id);


--
-- Name: index_admin_users_on_email; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX index_admin_users_on_email ON public.admin_users USING btree (email);


--
-- Name: index_admin_users_on_reset_password_token; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX index_admin_users_on_reset_password_token ON public.admin_users USING btree (reset_password_token);


--
-- Name: index_collection_items_on_collection_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_collection_items_on_collection_id ON public.collection_items USING btree (collection_id);


--
-- Name: index_collection_items_on_item_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_collection_items_on_item_id ON public.collection_items USING btree (item_id);


--
-- Name: index_collections_on_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_collections_on_user_id ON public.collections USING btree (user_id);


--
-- Name: index_investment_request_on_proposal_accept; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_investment_request_on_proposal_accept ON public.wms_investment_requests USING btree (proposal_id, investment_id, type, investment_amount);


--
-- Name: index_items_on_idea_set_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_items_on_idea_set_id ON public.items USING btree (idea_set_id);


--
-- Name: index_items_on_item_type_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_items_on_item_type_id ON public.items USING btree (item_type_id);


--
-- Name: index_items_on_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_items_on_user_id ON public.items USING btree (user_id);


--
-- Name: index_links_on_item_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_links_on_item_id ON public.links USING btree (item_id);


--
-- Name: index_on_wms_investment_plan_composite_key; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_on_wms_investment_plan_composite_key ON public.wms_investment_plans USING btree (deleted_at, investment_id, status);


--
-- Name: index_on_wms_proposals_composite_key; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_on_wms_proposals_composite_key ON public.wms_proposals USING btree (id, proposal_status, investment_plan_id);


--
-- Name: index_person_idea_sets_on_idea_set_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_person_idea_sets_on_idea_set_id ON public.person_idea_sets USING btree (idea_set_id);


--
-- Name: index_person_idea_sets_on_person_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_person_idea_sets_on_person_id ON public.person_idea_sets USING btree (person_id);


--
-- Name: index_recommendations_on_idea_set_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_recommendations_on_idea_set_id ON public.recommendations USING btree (idea_set_id);


--
-- Name: index_recommendations_on_item_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_recommendations_on_item_id ON public.recommendations USING btree (item_id);


--
-- Name: index_recommendations_on_person_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_recommendations_on_person_id ON public.recommendations USING btree (person_id);


--
-- Name: index_recurring_investment_on_proposal_accept; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_recurring_investment_on_proposal_accept ON public.wms_recurring_investments USING btree (currency_id, investment_plan_id, status, recurring_amount);


--
-- Name: index_reviews_on_item_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_reviews_on_item_id ON public.reviews USING btree (item_id);


--
-- Name: index_reviews_on_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_reviews_on_user_id ON public.reviews USING btree (user_id);


--
-- Name: index_reviews_on_user_id_and_item_id; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX index_reviews_on_user_id_and_item_id ON public.reviews USING btree (user_id, item_id);


--
-- Name: index_topic_idea_sets_on_idea_set_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_topic_idea_sets_on_idea_set_id ON public.topic_idea_sets USING btree (idea_set_id);


--
-- Name: index_topic_idea_sets_on_topic_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_topic_idea_sets_on_topic_id ON public.topic_idea_sets USING btree (topic_id);


--
-- Name: index_topic_relations_on_from_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_topic_relations_on_from_id ON public.topic_relations USING btree (from_id);


--
-- Name: index_topic_relations_on_to_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_topic_relations_on_to_id ON public.topic_relations USING btree (to_id);


--
-- Name: index_topics_on_name; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX index_topics_on_name ON public.topics USING btree (name);


--
-- Name: index_topics_on_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_topics_on_user_id ON public.topics USING btree (user_id);


--
-- Name: index_user_topics_on_by_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_user_topics_on_by_user_id ON public.user_topics USING btree (by_user_id);


--
-- Name: index_user_topics_on_topic_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_user_topics_on_topic_id ON public.user_topics USING btree (topic_id);


--
-- Name: index_user_topics_on_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_user_topics_on_user_id ON public.user_topics USING btree (user_id);


--
-- Name: index_user_topics_on_user_id_and_by_user_id_and_action; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX index_user_topics_on_user_id_and_by_user_id_and_action ON public.user_topics USING btree (user_id, by_user_id, action);


--
-- Name: index_user_user_relations_on_from_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_user_user_relations_on_from_user_id ON public.user_user_relations USING btree (from_user_id);


--
-- Name: index_user_user_relations_on_to_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_user_user_relations_on_to_user_id ON public.user_user_relations USING btree (to_user_id);


--
-- Name: index_user_vouchers_on_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_user_vouchers_on_user_id ON public.user_vouchers USING btree (user_id);


--
-- Name: index_user_vouchers_on_voucher_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_user_vouchers_on_voucher_id ON public.user_vouchers USING btree (voucher_id);


--
-- Name: index_versions_on_item_type_and_item_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_versions_on_item_type_and_item_id ON public.versions USING btree (item_type, item_id);


--
-- Name: index_vouchers_on_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_vouchers_on_user_id ON public.vouchers USING btree (user_id);


--
-- Name: index_wms_activities_on_current_gp_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_wms_activities_on_current_gp_id ON public.wms_activities USING btree (current_gp_id);


--
-- Name: index_wms_activities_on_edited_gp_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_wms_activities_on_edited_gp_id ON public.wms_activities USING btree (edited_gp_id);


--
-- Name: index_wms_activities_on_investment_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_wms_activities_on_investment_id ON public.wms_activities USING btree (investment_id);


--
-- Name: index_wms_activities_on_investment_request_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_wms_activities_on_investment_request_id ON public.wms_activities USING btree (investment_request_id);


--
-- Name: index_wms_addresses_on_deleted_at; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_wms_addresses_on_deleted_at ON public.wms_addresses USING btree (deleted_at);


--
-- Name: index_wms_addresses_on_investor_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_wms_addresses_on_investor_id ON public.wms_addresses USING btree (investor_id);


--
-- Name: index_wms_answers_on_question_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_wms_answers_on_question_id ON public.wms_answers USING btree (question_id);


--
-- Name: index_wms_apps_on_name; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX index_wms_apps_on_name ON public.wms_apps USING btree (name);


--
-- Name: index_wms_cash_accounts_on_account_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_wms_cash_accounts_on_account_id ON public.wms_cash_accounts USING btree (account_id);


--
-- Name: index_wms_cash_accounts_on_account_id_and_cash_account_type; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_wms_cash_accounts_on_account_id_and_cash_account_type ON public.wms_cash_accounts USING btree (account_id, cash_account_type);


--
-- Name: index_wms_cash_accounts_on_cash_account_type; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_wms_cash_accounts_on_cash_account_type ON public.wms_cash_accounts USING btree (cash_account_type);


--
-- Name: index_wms_cash_transfer_requests_on_deleted_at; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_wms_cash_transfer_requests_on_deleted_at ON public.wms_cash_transfer_requests USING btree (deleted_at);


--
-- Name: index_wms_cash_transfer_requests_on_destination_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_wms_cash_transfer_requests_on_destination_id ON public.wms_cash_transfer_requests USING btree (destination_id);


--
-- Name: index_wms_cash_transfer_requests_on_investment_request_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_wms_cash_transfer_requests_on_investment_request_id ON public.wms_cash_transfer_requests USING btree (investment_request_id);


--
-- Name: index_wms_cash_transfer_requests_on_received_currency_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_wms_cash_transfer_requests_on_received_currency_id ON public.wms_cash_transfer_requests USING btree (received_currency_id);


--
-- Name: index_wms_cash_transfer_requests_on_requested_currency_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_wms_cash_transfer_requests_on_requested_currency_id ON public.wms_cash_transfer_requests USING btree (requested_currency_id);


--
-- Name: index_wms_cash_transfer_requests_on_source_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_wms_cash_transfer_requests_on_source_id ON public.wms_cash_transfer_requests USING btree (source_id);


--
-- Name: index_wms_cash_transfer_requests_on_status; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_wms_cash_transfer_requests_on_status ON public.wms_cash_transfer_requests USING btree (status);


--
-- Name: index_wms_expected_outcomes_on_investment_plan_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_wms_expected_outcomes_on_investment_plan_id ON public.wms_expected_outcomes USING btree (investment_plan_id);


--
-- Name: index_wms_expected_outcomes_on_proposal_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_wms_expected_outcomes_on_proposal_id ON public.wms_expected_outcomes USING btree (proposal_id);


--
-- Name: index_wms_goal_types_on_channel_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_wms_goal_types_on_channel_id ON public.wms_goal_types USING btree (channel_id);


--
-- Name: index_wms_investment_items_on_instrument_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_wms_investment_items_on_instrument_id ON public.wms_investment_items USING btree (instrument_id);


--
-- Name: index_wms_investment_items_on_investment_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_wms_investment_items_on_investment_id ON public.wms_investment_items USING btree (investment_id);


--
-- Name: index_wms_investment_items_on_investment_request_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_wms_investment_items_on_investment_request_id ON public.wms_investment_items USING btree (investment_request_id);


--
-- Name: index_wms_investment_items_on_proposal_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_wms_investment_items_on_proposal_id ON public.wms_investment_items USING btree (proposal_id);


--
-- Name: index_wms_investment_items_on_recurring_investment_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_wms_investment_items_on_recurring_investment_id ON public.wms_investment_items USING btree (recurring_investment_id);


--
-- Name: index_wms_investment_plans_on_currency_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_wms_investment_plans_on_currency_id ON public.wms_investment_plans USING btree (currency_id);


--
-- Name: index_wms_investment_plans_on_deleted_at; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_wms_investment_plans_on_deleted_at ON public.wms_investment_plans USING btree (deleted_at);


--
-- Name: index_wms_investment_plans_on_expense_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_wms_investment_plans_on_expense_id ON public.wms_investment_plans USING btree (expense_id);


--
-- Name: index_wms_investment_plans_on_goal_type_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_wms_investment_plans_on_goal_type_id ON public.wms_investment_plans USING btree (goal_type_id);


--
-- Name: index_wms_investment_plans_on_id_and_investor_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_wms_investment_plans_on_id_and_investor_id ON public.wms_investment_plans USING btree (id, investor_id);


--
-- Name: index_wms_investment_plans_on_investment_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_wms_investment_plans_on_investment_id ON public.wms_investment_plans USING btree (investment_id);


--
-- Name: index_wms_investment_plans_on_investor_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_wms_investment_plans_on_investor_id ON public.wms_investment_plans USING btree (investor_id);


--
-- Name: index_wms_investment_plans_on_status; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_wms_investment_plans_on_status ON public.wms_investment_plans USING btree (status);


--
-- Name: index_wms_investment_requests_on_investment_amount; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_wms_investment_requests_on_investment_amount ON public.wms_investment_requests USING btree (investment_amount);


--
-- Name: index_wms_investment_requests_on_investment_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_wms_investment_requests_on_investment_id ON public.wms_investment_requests USING btree (investment_id);


--
-- Name: index_wms_investment_requests_on_proposal_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_wms_investment_requests_on_proposal_id ON public.wms_investment_requests USING btree (proposal_id);


--
-- Name: index_wms_investment_requests_on_recurring_investment_date; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_wms_investment_requests_on_recurring_investment_date ON public.wms_investment_requests USING btree (recurring_investment_date);


--
-- Name: index_wms_investment_requests_on_recurring_investment_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_wms_investment_requests_on_recurring_investment_id ON public.wms_investment_requests USING btree (recurring_investment_id);


--
-- Name: index_wms_investment_requests_on_type; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_wms_investment_requests_on_type ON public.wms_investment_requests USING btree (type);


--
-- Name: index_wms_investment_requests_on_updated_at; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_wms_investment_requests_on_updated_at ON public.wms_investment_requests USING btree (updated_at);


--
-- Name: index_wms_investments_on_active_since; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_wms_investments_on_active_since ON public.wms_investments USING btree (active_since);


--
-- Name: index_wms_investments_on_currency_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_wms_investments_on_currency_id ON public.wms_investments USING btree (currency_id);


--
-- Name: index_wms_investments_on_deleted_at; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_wms_investments_on_deleted_at ON public.wms_investments USING btree (deleted_at);


--
-- Name: index_wms_investments_on_id_and_investor_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_wms_investments_on_id_and_investor_id ON public.wms_investments USING btree (id, investor_id);


--
-- Name: index_wms_investments_on_investment_plan_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_wms_investments_on_investment_plan_id ON public.wms_investments USING btree (investment_plan_id);


--
-- Name: index_wms_investments_on_investment_wrapper_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_wms_investments_on_investment_wrapper_id ON public.wms_investments USING btree (investment_wrapper_id);


--
-- Name: index_wms_investments_on_investor_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_wms_investments_on_investor_id ON public.wms_investments USING btree (investor_id);


--
-- Name: index_wms_investments_on_last_activity_date; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_wms_investments_on_last_activity_date ON public.wms_investments USING btree (last_activity_date);


--
-- Name: index_wms_investments_on_proposal_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_wms_investments_on_proposal_id ON public.wms_investments USING btree (proposal_id);


--
-- Name: index_wms_investments_on_status; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_wms_investments_on_status ON public.wms_investments USING btree (status);


--
-- Name: index_wms_investments_on_updated_at; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_wms_investments_on_updated_at ON public.wms_investments USING btree (updated_at);


--
-- Name: index_wms_investor_accounts_on_deleted_at; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_wms_investor_accounts_on_deleted_at ON public.wms_investor_accounts USING btree (deleted_at);


--
-- Name: index_wms_investor_accounts_on_investor_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_wms_investor_accounts_on_investor_id ON public.wms_investor_accounts USING btree (investor_id);


--
-- Name: index_wms_investors_on_deleted_at; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_wms_investors_on_deleted_at ON public.wms_investors USING btree (deleted_at);


--
-- Name: index_wms_investors_on_id_and_deleted_at; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_wms_investors_on_id_and_deleted_at ON public.wms_investors USING btree (id, deleted_at);


--
-- Name: index_wms_investors_on_investor_reference_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_wms_investors_on_investor_reference_id ON public.wms_investors USING btree (investor_reference_id);


--
-- Name: index_wms_investors_on_investor_wrapper_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_wms_investors_on_investor_wrapper_id ON public.wms_investors USING btree (investor_wrapper_id);


--
-- Name: index_wms_kycs_on_deleted_at; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_wms_kycs_on_deleted_at ON public.wms_kycs USING btree (deleted_at);


--
-- Name: index_wms_kycs_on_investor_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_wms_kycs_on_investor_id ON public.wms_kycs USING btree (investor_id);


--
-- Name: index_wms_proposals_on_investment_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_wms_proposals_on_investment_id ON public.wms_proposals USING btree (investment_id);


--
-- Name: index_wms_proposals_on_investment_plan_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_wms_proposals_on_investment_plan_id ON public.wms_proposals USING btree (investment_plan_id);


--
-- Name: index_wms_proposals_on_proposal_status; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_wms_proposals_on_proposal_status ON public.wms_proposals USING btree (proposal_status);


--
-- Name: index_wms_question_options_on_question_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_wms_question_options_on_question_id ON public.wms_question_options USING btree (question_id);


--
-- Name: index_wms_question_sections_on_questionary_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_wms_question_sections_on_questionary_id ON public.wms_question_sections USING btree (questionary_id);


--
-- Name: index_wms_questions_on_question_section_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_wms_questions_on_question_section_id ON public.wms_questions USING btree (question_section_id);


--
-- Name: index_wms_recurring_investments_on_currency_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_wms_recurring_investments_on_currency_id ON public.wms_recurring_investments USING btree (currency_id);


--
-- Name: index_wms_recurring_investments_on_deleted_at; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_wms_recurring_investments_on_deleted_at ON public.wms_recurring_investments USING btree (deleted_at);


--
-- Name: index_wms_recurring_investments_on_investment_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_wms_recurring_investments_on_investment_id ON public.wms_recurring_investments USING btree (investment_id);


--
-- Name: index_wms_recurring_investments_on_investment_plan_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_wms_recurring_investments_on_investment_plan_id ON public.wms_recurring_investments USING btree (investment_plan_id);


--
-- Name: index_wms_recurring_investments_on_recurring_amount; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_wms_recurring_investments_on_recurring_amount ON public.wms_recurring_investments USING btree (recurring_amount);


--
-- Name: index_wms_recurring_investments_on_status; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_wms_recurring_investments_on_status ON public.wms_recurring_investments USING btree (status);


--
-- Name: index_wms_recurring_investments_on_upcoming_day; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_wms_recurring_investments_on_upcoming_day ON public.wms_recurring_investments USING btree (upcoming_day);


--
-- Name: index_wms_risk_profiles_on_channel_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_wms_risk_profiles_on_channel_id ON public.wms_risk_profiles USING btree (channel_id);


--
-- Name: index_wms_suggestions_on_investment_plan_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX index_wms_suggestions_on_investment_plan_id ON public.wms_suggestions USING btree (investment_plan_id);


--
-- Name: trgm_items_name_indx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX trgm_items_name_indx ON public.items USING gist (name public.gist_trgm_ops);


--
-- Name: user_topics fk_rails_0aa5b25f82; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_topics
    ADD CONSTRAINT fk_rails_0aa5b25f82 FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: user_user_relations fk_rails_10bcd883e4; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_user_relations
    ADD CONSTRAINT fk_rails_10bcd883e4 FOREIGN KEY (from_user_id) REFERENCES public.users(id);


--
-- Name: reviews fk_rails_1b37fb5a2a; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT fk_rails_1b37fb5a2a FOREIGN KEY (item_id) REFERENCES public.items(id);


--
-- Name: collection_items fk_rails_29c02f6872; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.collection_items
    ADD CONSTRAINT fk_rails_29c02f6872 FOREIGN KEY (item_id) REFERENCES public.items(id);


--
-- Name: activity_pub_followers fk_rails_3ce6f9a7a2; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.activity_pub_followers
    ADD CONSTRAINT fk_rails_3ce6f9a7a2 FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: topic_relations fk_rails_4e9299d5db; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.topic_relations
    ADD CONSTRAINT fk_rails_4e9299d5db FOREIGN KEY (to_id) REFERENCES public.topics(id);


--
-- Name: topic_idea_sets fk_rails_4fb9cd9cdf; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.topic_idea_sets
    ADD CONSTRAINT fk_rails_4fb9cd9cdf FOREIGN KEY (topic_id) REFERENCES public.topics(id);


--
-- Name: recommendations fk_rails_5057f7d09a; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.recommendations
    ADD CONSTRAINT fk_rails_5057f7d09a FOREIGN KEY (idea_set_id) REFERENCES public.idea_sets(id);


--
-- Name: items fk_rails_6bed0f90a5; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.items
    ADD CONSTRAINT fk_rails_6bed0f90a5 FOREIGN KEY (item_type_id) REFERENCES public.item_types(id);


--
-- Name: reviews fk_rails_74a66bd6c5; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT fk_rails_74a66bd6c5 FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: recommendations fk_rails_776fd0ec01; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.recommendations
    ADD CONSTRAINT fk_rails_776fd0ec01 FOREIGN KEY (item_id) REFERENCES public.items(id);


--
-- Name: topics fk_rails_7b812cfb44; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.topics
    ADD CONSTRAINT fk_rails_7b812cfb44 FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: topic_idea_sets fk_rails_853a6f5036; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.topic_idea_sets
    ADD CONSTRAINT fk_rails_853a6f5036 FOREIGN KEY (idea_set_id) REFERENCES public.idea_sets(id);


--
-- Name: collections fk_rails_9b33697360; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.collections
    ADD CONSTRAINT fk_rails_9b33697360 FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: recommendations fk_rails_a7499a8cff; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.recommendations
    ADD CONSTRAINT fk_rails_a7499a8cff FOREIGN KEY (person_id) REFERENCES public.people(id);


--
-- Name: collection_items fk_rails_b1a778644b; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.collection_items
    ADD CONSTRAINT fk_rails_b1a778644b FOREIGN KEY (collection_id) REFERENCES public.collections(id);


--
-- Name: user_topics fk_rails_bfe29ea272; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_topics
    ADD CONSTRAINT fk_rails_bfe29ea272 FOREIGN KEY (topic_id) REFERENCES public.topics(id);


--
-- Name: person_idea_sets fk_rails_c3b7c63f2d; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.person_idea_sets
    ADD CONSTRAINT fk_rails_c3b7c63f2d FOREIGN KEY (idea_set_id) REFERENCES public.idea_sets(id);


--
-- Name: user_topics fk_rails_d399e7a245; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_topics
    ADD CONSTRAINT fk_rails_d399e7a245 FOREIGN KEY (by_user_id) REFERENCES public.users(id);


--
-- Name: items fk_rails_d4b6334db2; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.items
    ADD CONSTRAINT fk_rails_d4b6334db2 FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: user_user_relations fk_rails_d52301166a; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_user_relations
    ADD CONSTRAINT fk_rails_d52301166a FOREIGN KEY (to_user_id) REFERENCES public.users(id);


--
-- Name: items fk_rails_d85b4d9a08; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.items
    ADD CONSTRAINT fk_rails_d85b4d9a08 FOREIGN KEY (idea_set_id) REFERENCES public.idea_sets(id);


--
-- Name: person_idea_sets fk_rails_dc3ce95beb; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.person_idea_sets
    ADD CONSTRAINT fk_rails_dc3ce95beb FOREIGN KEY (person_id) REFERENCES public.people(id);


--
-- Name: links fk_rails_e1bb872bea; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.links
    ADD CONSTRAINT fk_rails_e1bb872bea FOREIGN KEY (item_id) REFERENCES public.items(id);


--
-- Name: topic_relations fk_rails_f2d3454ee0; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.topic_relations
    ADD CONSTRAINT fk_rails_f2d3454ee0 FOREIGN KEY (from_id) REFERENCES public.topics(id);


--
-- PostgreSQL database dump complete
--

SET search_path TO "$user", public;

INSERT INTO "schema_migrations" (version) VALUES
('20190318163043'),
('20190319060555'),
('20190323161504'),
('20190323161545'),
('20190323161740'),
('20190323161823'),
('20190323164142'),
('20190323164144'),
('20190323181309'),
('20190411113018'),
('20190423135944'),
('20190424054617'),
('20190424055701'),
('20190424105712'),
('20190424105713'),
('20190424110506'),
('20190424110523'),
('20190424110531'),
('20190424110540'),
('20190424110553'),
('20190424111503'),
('20190425073013'),
('20190425080837'),
('20190425081244'),
('20190425100101'),
('20190425100106'),
('20190425100244'),
('20190425110801'),
('20190425110851'),
('20190425111023'),
('20190425111038'),
('20190502100020'),
('20190508074704'),
('20190508091007'),
('20190509061626'),
('20190509063242'),
('20190509063803'),
('20190509073025'),
('20190509073850'),
('20190509092523'),
('20190509093951'),
('20190509103135'),
('20190509104245'),
('20190509104538'),
('20190509124217'),
('20190509144148'),
('20190509144501'),
('20190510080332'),
('20190510094737'),
('20190510154731'),
('20190512033447'),
('20190513071906'),
('20190513082412'),
('20190513111038'),
('20190514163710'),
('20190515093433'),
('20190516060351'),
('20190516072555'),
('20190517060952'),
('20190517084914'),
('20190519045414'),
('20190519061036'),
('20190528061714'),
('20190528092308'),
('20190528092934'),
('20190528123329'),
('20190530120616'),
('20190530121141'),
('20190530121807'),
('20190530121809'),
('20190531081056'),
('20190601022106'),
('20190604061609'),
('20190604140829'),
('20190610071509'),
('20190610071612'),
('20190610164206'),
('20190612145728'),
('20190612153847'),
('20190616171344'),
('20190617063002'),
('20190617093146'),
('20190618000042'),
('20190619090036'),
('20190624081914'),
('20190625102106'),
('20190625190258'),
('20190625194234'),
('20190626113723'),
('20190626115138'),
('20190626121008'),
('20190703030124'),
('20190703090854'),
('20190704063056'),
('20190705003038'),
('20190706110136'),
('20190706175347'),
('20190711052836'),
('20190711123958'),
('20190714025449'),
('20190715054137'),
('20190715093207'),
('20190716104538'),
('20190717185003'),
('20190718135307'),
('20190719123147'),
('20190719124349'),
('20190725095820'),
('20190725101714'),
('20190725140806'),
('20190725173959'),
('20190726121147'),
('20190731124806'),
('20190801074255'),
('20190802102117'),
('20190805054139'),
('20190805101323'),
('20190805124000'),
('20190807061505'),
('20190807074849'),
('20190807165023'),
('20190808082633'),
('20190808101433'),
('20190812102543'),
('20190814070817'),
('20190814072444'),
('20190819073346'),
('20190819083959'),
('20190821060649'),
('20190826110535'),
('20190827092143'),
('20190829045625'),
('20190911082344'),
('20190911092324'),
('20190911124141'),
('20190912110323'),
('20190913055930'),
('20190916073951'),
('20190917115933'),
('20190917121939'),
('20190923125443'),
('20191001050021'),
('20191015055438'),
('20191021073641'),
('20191029092941'),
('20191030071624'),
('20191031060520'),
('20191031084707'),
('20191101144409'),
('20191101172456'),
('20191105105946'),
('20191106074532'),
('20191107101307'),
('20191108051151'),
('20191112072247'),
('20191113051507'),
('20191113051912'),
('20191114042350'),
('20191118085235'),
('20191201180125'),
('20191201180754'),
('20191201180932'),
('20191201181058'),
('20191201181233'),
('20191201181333'),
('20191203091153'),
('20191203094007'),
('20191204130445'),
('20191204131129'),
('20191204133031'),
('20191204133602'),
('20191204135853'),
('20191205060910'),
('20191206100540'),
('20191209045806'),
('20191210062300'),
('20191210091042'),
('20191211050813'),
('20191211105509'),
('20191212090545'),
('20191216064237'),
('20191216101108'),
('20191218054052'),
('20200102104959');


